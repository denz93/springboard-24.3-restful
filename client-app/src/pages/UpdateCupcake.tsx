import { Show, createEffect, createResource, createSignal } from 'solid-js';
import styles from './NewCupcake.module.css'
import { CupcakeType } from '../types/Cupcake';
import FileChooser from '../components/FileChooser';
import { createCupcake, deleteCupcake, fetchCupcake, updateCupcake, uploadImage } from '../resouces/cupcake';
import { appendToast } from '../common/ToastChannel';
import { useNavigate, useParams } from '@solidjs/router';
import defaultImage from '../assets/image.svg';

const UpdateCupcake = () => {
  const params = useParams()
  const nav = useNavigate()
  const [cupcakeRes] = createResource(params.id, fetchCupcake);

  const [cupcake, setCupcake] = createSignal({
    flavor: "",
    id: 0, 
    image: "",
    rating: 0,
    size: ""
  } as CupcakeType)

  createEffect(() => {
    if (cupcakeRes())
      setCupcake(cupcakeRes() as CupcakeType)
  })

  let img: HTMLImageElement | undefined;

  const deleteHandler = async (event: Event) => {
    event.preventDefault();
    try {
      const result = await deleteCupcake(params.id)
      if (result.message == 'Deleted') {
        appendToast({message: `Cupcake id "#${params.id}" deleted`, type: 'success'})
        nav('/')
      } else {
        appendToast({message: `Delete Cupcake id "#${params.id}" failed`, type: 'error'})
      }
    } catch(e) {
      appendToast({message: `Delete Cupcake id "#${params.id}" failed`, type: 'error'})
    }
  }
  const updateHandler = async (event: Event) => {
    event.preventDefault();
    try {
      const updatedCupcake = await updateCupcake(cupcake())
      appendToast({
          message: `Cupcake ${updatedCupcake.flavor} with id #${updatedCupcake.id} updated`, 
          type: "success"
      })
    } catch (err: any) {
      appendToast({
        message: err.response.data.message, 
        type: "error"
    })
    }
  }

  const localFileHandler = async (files: FileList) => {
    const url = URL.createObjectURL(files.item(0) as File)
    if (img) {
      img.src = url
    }
    const uploaded = await uploadImage(files)
    setCupcake((value) => ({...value, image: uploaded.url}))
  }
        
  return <>
    <h1>Update Cupcake #{cupcake().id}</h1>
    <form class={styles.form}>
      <div class={styles.imageField}>
        <img src={cupcake().image} ref={img} onError={(e) => {(e.target as HTMLImageElement).src = defaultImage}}></img>
        <FileChooser accept='image/*' name='image' onChange={localFileHandler}>Upload image</FileChooser>
      </div>
      <div class={styles.field}>
        <label>Flavor</label>
        <input type='text' placeholder='Enter a flavor' value={cupcake().flavor} onInput={(e) => setCupcake({...cupcake(), flavor: e.target.value})}/>
      </div>

      <div class={styles.field}>
        <label>Size</label>
        <input type='text' placeholder='Ex: large, medium, etc' value={cupcake().size} onInput={(e) => setCupcake({...cupcake(), size: e.target.value})}/>
      </div>

      <div class={styles.field}>
        <label>Rating</label>
        <input type='number' value={cupcake().rating} onInput={(e) => setCupcake({...cupcake(), rating: parseFloat(e.target.value)})}/>
      </div>
      <div class={styles.actionGroup}>
        <button type='submit' onClick={updateHandler}>Update</button>
        <button type='submit' onClick={deleteHandler}>Delete</button>
      </div>
    </form>
  </>
}

export default UpdateCupcake;