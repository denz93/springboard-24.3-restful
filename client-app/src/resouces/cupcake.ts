import { CupcakeType } from "../types/Cupcake";
import axios from 'axios'

const HOST_URL = 'http://localhost:5000/api';

export const fetchCupcakeList = async () => {
  const res = await fetch(HOST_URL + '/cupcakes')
  const data = await res.json()
  return data.cupcakes as CupcakeType[]
}

export const fetchCupcake = async (id: number | string) => {
  const res = await fetch(HOST_URL + `/cupcakes/${id}`)
  const data = await res.json()
  console.log(data.cupcake)
  return data.cupcake as CupcakeType
}

type UploadImageResponse = {
  url: string
}

type DeleteCupcakeResponse = {
  message: string
}

type UpdateCupcakeInput = CupcakeType

type CreateCupcakeInput = Omit<CupcakeType, "id">

export const uploadImage = async (files: FileList) => {
  const res = await axios.postForm(HOST_URL + '/upload', {
    image: files[0]
  })
  return res.data as UploadImageResponse
}

export const createCupcake = async (cupcake: CreateCupcakeInput) => {
  const res = await axios.post(HOST_URL + '/cupcakes', {
    ...cupcake
  })
  return res.data.cupcake as CupcakeType
}

export const updateCupcake = async (cupcake: UpdateCupcakeInput) => {
  const {id, ...payload} = cupcake
  const res = await axios.patch(HOST_URL + `/cupcakes/${cupcake.id}`, {
    ...payload
  })

  return res.data.cupcake as CupcakeType
}

export const deleteCupcake = async (cupcakeId: number|string) => {
  const res = await axios.delete(HOST_URL + `/cupcakes/${cupcakeId}`)
  return res.data as DeleteCupcakeResponse
}

