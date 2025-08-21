import api from "./api"
import Swal from "sweetalert2"
import { AxiosError } from "axios"

export class BankService 
{ 
  static async listBanks() {
    try {
      
      const response = await api.get('/institution')
      return response.data

    } catch (err: unknown) {

      const error = err as AxiosError<{ message?: string }>
      const message = error.response?.data?.message || error.message || 'Erro inesperado!'

      Swal.fire({
        icon: 'warning',
        title: 'Erro inesperado!',
        text: message,
      })
    }
  }
}
