// src/store/reservation.ts
import { defineStore } from 'pinia'

export const useReservationStore = defineStore('reservation', {
  state: () => ({
    size: '' as 'small' | 'large' | '',
    type: '' as 'mix' | 'custom' | '',
    name: '',
    phone: '',
    email: '',
    notes: '',
    selectedSushi: [] as string[]
  }),
  actions: {
    reset() {
      this.size = ''
      this.type = ''
      this.name = ''
      this.phone = ''
      this.email = ''
      this.notes = ''
      this.selectedSushi = []
    }
  }
})
