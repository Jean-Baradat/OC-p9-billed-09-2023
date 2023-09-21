import { ROUTES_PATH } from '../constants/routes.js'
import Logout from "./Logout.js"

export default class NewBill {
    constructor({ document, onNavigate, store, localStorage }) {
        this.document = document
        this.onNavigate = onNavigate
        this.store = store
        const formNewBill = this.document.querySelector(`form[data-testid="form-new-bill"]`)
        formNewBill.addEventListener("submit", this.handleSubmit)
        const file = this.document.querySelector(`input[data-testid="file"]`)
        file.addEventListener("change", this.handleChangeFile)
        this.fileUrl = null
        this.fileName = null
        this.billId = null
        this.type = null
        new Logout({ document, localStorage, onNavigate })
    }

    /**
     * Handles the file change event and creates a new bill.
     * 
     * @param {Event} e - The event object.
     */
    handleChangeFile = e => {
        e.preventDefault()

        const file = this.document.querySelector(`input[data-testid="file"]`).files[0]
        const filePath = e.target.value.split(/\\/g)
        const fileName = filePath[filePath.length - 1]
        const formData = new FormData()
        const email = JSON.parse(localStorage.getItem("user")).email
        this.type = file.type

        if (['image/png', 'image/jpeg', 'image/jpg'].includes(this.type)) {

            this.document.querySelector(`input[data-testid="file"]`).classList.remove('is-invalid')

            formData.append('file', file)
            formData.append('email', email)

            this.store
                .bills()
                .create({
                    data: formData,
                    headers: {
                        noContentType: true
                    }
                })
                .then(({ fileUrl, key }) => {
                    console.log(fileUrl, key, "fileUrl, key")
                    this.billId = key
                    this.fileUrl = fileUrl
                    this.fileName = fileName
                }).catch(error => console.error(error))

        } else {
            this.document.querySelector(`input[data-testid="file"]`).classList.add('is-invalid')
        }
    }

    /**
     * Handles the form submission for creating a new bill.
     * 
     * @param {Event} e - The form submission event.
     */
    handleSubmit = e => {
        e.preventDefault()

        const email = JSON.parse(localStorage.getItem("user")).email

        const bill = {
            email,
            type: e.target.querySelector(`select[data-testid="expense-type"]`).value,
            name: e.target.querySelector(`input[data-testid="expense-name"]`).value,
            amount: parseInt(e.target.querySelector(`input[data-testid="amount"]`).value),
            date: e.target.querySelector(`input[data-testid="datepicker"]`).value,
            vat: e.target.querySelector(`input[data-testid="vat"]`).value,
            pct: parseInt(e.target.querySelector(`input[data-testid="pct"]`).value) || 20,
            commentary: e.target.querySelector(`textarea[data-testid="commentary"]`).value,
            fileUrl: this.fileUrl,
            fileName: this.fileName,
            status: 'pending'
        }

        if (['image/png', 'image/jpeg', 'image/jpg'].includes(this.type)) {
            this.updateBill(bill)
            this.onNavigate(ROUTES_PATH['Bills'])
        }
    }


    /**
     * INFORMATIONS: Not need to cover this function by tests
     * 
     * Updates the bill.
     * 
     * @param {Object} bill - The bill to update.
     */
    updateBill = (bill) => {
        if (this.store) {
            this.store
                .bills()
                .update({ data: JSON.stringify(bill), selector: this.billId })
                .then(() => {
                    this.onNavigate(ROUTES_PATH['Bills'])
                })
                .catch(error => console.error(error))
        }
    }
}