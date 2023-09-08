import { For, createSignal } from "solid-js"
import { ToastType, createToastEffect } from "./ToastChannel"
import styles from './Toast.module.css'

const Toast = () => {
  const [toastList, setToastList] = createSignal([] as ToastType[])
  createToastEffect((toast) => {
    if (!toast) return 
    setToastList((value) => [toast, ...value])

    setTimeout(() => { setToastList(value => value.slice(0, -1)) }, 5000)
  })
  return <div class={styles.toast}>
    <For each={toastList()}>{(toast) => <div data-type={toast.type}>
      {toast.message}
    </div>}</For>
  </div>
}
export default Toast