import { createResource, createSignal } from 'solid-js';
import styles from './NewCupcake.module.css'
import { CupcakeType } from '../types/Cupcake';
import FileChooser from '../components/FileChooser';
import { createCupcake, updateCupcake, uploadImage } from '../resouces/cupcake';
import { appendToast } from '../common/ToastChannel';
import defaultImage from '../assets/image.svg';

const NewCupcake = () => {
  const [cupcake, setCupcake] = createSignal({
    flavor: "",
    image: "",
    rating: 0,
    size: ""
  } as Omit<CupcakeType, "id">);
  let img: HTMLImageElement | undefined;
  const submitHandler = async (event: SubmitEvent) => {
    event.preventDefault();
    try {
      const createdCupcake = await createCupcake(cupcake())
      setCupcake({
        flavor: "",
        image: "",
        rating: 0,
        size: ""
      })
      appendToast({
          message: `Cupcake ${createdCupcake.flavor} with id #${createdCupcake.id} created`, 
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
    <h1>Add new Cupcake</h1>
    <form class={styles.form} onSubmit={submitHandler}>
      <div class={styles.imageField}>
        <img src={defaultImage} ref={img}></img>
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
      <div>
        <button type='submit'>Submit</button>
      </div>
    </form>
  </>
}

export default NewCupcake;