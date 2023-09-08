type ChangeEffectCallback = () => any
type EventEmitterCallback<TData extends unknown> = (data?: TData) => any
export type ToastType = {message: string, type: "error" | "success"}

class EventEmitter<TData extends unknown> {
  protected register: Set<EventEmitterCallback<TData>>
  constructor() {
    this.register = new Set()
  }

  publish(data: TData) {
    for (let callback of this.register.keys()) {
      callback(data)
    }
  }

  subscribe(callback: EventEmitterCallback<TData>) {
    this.register.add(callback)
  }
}
const eventEmiter = new EventEmitter<ToastType>()

export const createToastEffect = (callback: EventEmitterCallback<ToastType>) => {
  eventEmiter.subscribe(callback)
}

export const appendToast = (toast: ToastType) => {
  eventEmiter.publish(toast)
}