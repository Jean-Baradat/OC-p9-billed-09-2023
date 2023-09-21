import { ROUTES_PATH } from '../constants/routes.js'
import Logout from "./Logout.js"

export default class NewBill {
    constructor({ document, onNavigate, store, localStorage }) {
        this.document = document
        this.onNavigate = onNavigate
        this.store = store
        this.email = JSON.parse(localStorage.getItem("user")).email

        const formNewBill = this.document.querySelector(`form[data-testid="form-new-bill"]`)
        formNewBill.addEventListener("submit", this.handleSubmit)
        this.fileInput = this.document.querySelector(`input[data-testid="file"]`)
        this.fileInput.addEventListener("change", this.handleChangeFile)

        this.fileName = null
        this.billId = null
        this.type = null
        this.file = null

        new Logout({ document, localStorage, onNavigate })
    }

    /**
     * This function is called when the user selects a file.
     * It checks if the file is valid or not.
     * 
     * @param {Event} e - The event object.
     */
    handleChangeFile = e => {
        e.preventDefault()

        this.file = this.document.querySelector(`input[data-testid="file"]`).files[0]

        const filePath = this.fileInput.value.split(/\\/g)
        this.fileName = filePath[filePath.length - 1]

        if (this.file) {
            this.type = this.file.type
        }

        if (['image/png', 'image/jpeg', 'image/jpg'].includes(this.type)) {
            this.document.querySelector(`input[data-testid="file"]`).classList.remove('is-invalid')
        } else {
            this.document.querySelector(`input[data-testid="file"]`).classList.add('is-invalid')
        }
    }

    /**
     * This function is called when the user submits the form.
     * It creates a new bill then updates it.
     * 
     * In first, we want to check if the file is valid or not.
     * Then, if the file is valid, we create a new bill.
     * Then if the bill is created, we update it with the data from the form.
     * 
     * @param {Event} e - The form submission event.
     */
    handleSubmit = e => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('file', this.file)
        formData.append('email', this.email)

        if (['image/png', 'image/jpeg', 'image/jpg'].includes(this.type)) {
            this.store
                .bills()
                .create({
                    data: formData,
                    headers: {
                        noContentType: true
                    }
                })
                .then(({ fileUrl, key }) => {
                    this.billId = key

                    const bill = {
                        email: this.email,
                        type: e.target.querySelector(`select[data-testid="expense-type"]`).value,
                        name: e.target.querySelector(`input[data-testid="expense-name"]`).value,
                        amount: parseInt(e.target.querySelector(`input[data-testid="amount"]`).value),
                        date: e.target.querySelector(`input[data-testid="datepicker"]`).value,
                        vat: e.target.querySelector(`input[data-testid="vat"]`).value,
                        pct: parseInt(e.target.querySelector(`input[data-testid="pct"]`).value) || 20,
                        commentary: e.target.querySelector(`textarea[data-testid="commentary"]`).value,
                        fileUrl,
                        fileName: this.fileName,
                        status: 'pending'
                    }

                    this.updateBill(bill)
                    this.onNavigate(ROUTES_PATH['Bills'])
                })
                .catch(error => console.error(error))
        }
    }


    /**
     * INFORMATIONS: Not need to cover this function by tests
     * 
     * This function is called when the user submits the form.
     * It updates the bill.
     * 
     * @param {Object} bill - The bill to update.
     */
    updateBill = bill => {
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