// src/store/reservation.ts
import { defineStore } from 'pinia'

export const useReservationStore = defineStore('reservation', {
  state: () => ({
    size: '' as 'regular' | 'large' | '',
    type: '' as 'mix' | 'custom' | '',
    name: '',
    phone: '',
    email: '',
    notes: '',
    selectedSushi: [] as string[],
    pickupDate: '',
    pickupTime: '',
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
      this.pickupDate = ''
      this.pickupTime = ''
    }
  }
})
