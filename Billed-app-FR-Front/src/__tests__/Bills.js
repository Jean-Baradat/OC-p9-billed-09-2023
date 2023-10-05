/**
 * @jest-environment jsdom
 */

import { fireEvent, screen, waitFor } from "@testing-library/dom"
import BillsUI from "../views/BillsUI.js"
import { ROUTES_PATH } from "../constants/routes.js";
import { localStorageMock } from "../__mocks__/localStorage.js";
import router from "../app/Router.js";
import store from "../__mocks__/store.js";
import Bills from "../containers/Bills.js";
import { ROUTES } from "../constants/routes"
import $ from 'jquery';

/**
 * This code is necessary to mock bootstrap modal
 */
$.fn.modal = jest.fn(function (option) {
    if (option === 'show') {
        this.addClass('show');
    }
})

describe("Given I am connected as an employee", () => {
    describe("When I am on Bills Page", () => {

        test("Then bill icon in vertical layout should be highlighted", async () => {

            Object.defineProperty(window, 'localStorage', { value: localStorageMock })

            window.localStorage.setItem('user', JSON.stringify({
                type: 'Employee'
            }))

            const root = document.createElement("div")
            root.setAttribute("id", "root")
            document.body.append(root)
            router()
            window.onNavigate(ROUTES_PATH.Bills)
            await waitFor(() => screen.getByTestId('icon-window'))
            const windowIcon = screen.getByTestId('icon-window')
            expect(windowIcon.classList.contains('active-icon')).toBeTruthy()
        })

        test("Then bills should be ordered from earliest to latest", async () => {

            document.body.innerHTML = BillsUI({ data: await store.bills().list() })
            const dates = screen.getAllByText(/^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/i).map(a => a.innerHTML)
            const antiChrono = (a, b) => ((a < b) ? 1 : -1)
            const datesSorted = [...dates].sort(antiChrono)
            expect(dates).toEqual(datesSorted)
        })

        /**
         * This test verifies the expected operation of the handleClickNewBill function.
         * To do this he mock the handleClickNewBill function and add an event listener
         * to the newBillButton. Then he simulates a click on the newBillButton and checks
         * the NewBill page is displayed.
         * 
         * To test if the NewBill page is open, we check if the screen contains the text
         * 'Envoyer une note de frais'. This text is only present on the NewBill page.
         */
        it("There should be a function to access the NewBill page", async () => {

            // Mock onNavigate function
            const onNavigate = (pathname) => {
                document.body.innerHTML = ROUTES({ pathname })
            }

            // add localStorage to window
            Object.defineProperty(window, 'localStorage', { value: localStorageMock })

            // set user to Employee
            window.localStorage.setItem('user', JSON.stringify({
                type: 'Employee'
            }))

            // Add BillsUI to document body
            document.body.innerHTML = BillsUI({ data: [] })

            // Create new Bills container
            const bills = new Bills({ document, onNavigate, store, localStorage })

            // Mock handleClickNewBill function
            const handleClickNewBill = jest.fn(bills.handleClickNewBill)

            // Get newBillButton
            const newBillButton = screen.getByTestId('btn-new-bill')

            // Add event listener to newBillButton
            newBillButton.addEventListener('click', handleClickNewBill)

            // Click on newBillButton to trigger handleClickNewBill
            fireEvent.click(newBillButton)

            // Expect screen to contain NewBill page
            // to test this, we check if the screen contains the text 'Envoyer une note de frais'
            expect(screen.queryByText('Envoyer une note de frais')).toBeTruthy()
        })

        /**
         * This test verifies there is a button to access the NewBill page.
         * To do this it adds BillsUI to document body and checks if the button exists.
         */
        it("There should be a button to access the NewBill page", () => {

            document.body.innerHTML = BillsUI({ data: [] })

            const newBillButton = screen.queryByTestId('btn-new-bill')

            // Expect newBillButton exists
            expect(newBillButton).toBeTruthy()
        })

        /**
         * This test verifies the expected operation of the handleClickIconEye function. 
         * To do this he mock the handleClickIconEye function and add an event listener 
         * to the iconEye. Then he simulates a click on the iconEye and checks the image
         * is displayed.
         * 
         * To test if the modal is open, we check if the modal is displayed with the class 
         * 'show'. 'show' is a bootstrap class that is added to the modal when it is 
         * displayed.
         */
        it("There should be a function to open modal with image", async () => {

            const onNavigate = (pathname) => {
                document.body.innerHTML = ROUTES({ pathname })
            }

            Object.defineProperty(window, 'localStorage', { value: localStorageMock })

            window.localStorage.setItem('user', JSON.stringify({
                type: 'Employee'
            }))

            // Add BillsUI with list of bills to document body
            document.body.innerHTML = BillsUI({ data: await store.bills().list() })

            const bills = new Bills({ document, onNavigate, store, localStorage })

            // Mock handleClickIconEye function
            const handleClickIconEye = jest.fn(bills.handleClickIconEye)

            // Get all iconEyes
            const iconEyes = screen.getAllByTestId('icon-eye')

            // Add event listener to a single iconEye
            iconEyes[0].addEventListener('click', handleClickIconEye(iconEyes[0]))

            // Click on this iconEye to trigger handleClickIconEye
            fireEvent.click(iconEyes[0])

            // Test if document body contains image of the modal
            const img = screen.queryByAltText('Bill')
            expect(img).toBeTruthy()

            // Test if modal is shown with class 'show' (bootstrap)
            const modal = screen.queryByTestId('modaleFile')
            expect(modal).toBeTruthy()
            expect(modal.classList.contains('show')).toBeTruthy()
        })

        /**
         * This test verifies there is a button to open modal of bill.
         * To do this it adds BillsUI to document body and checks if the button exists.
         */
        it("There should be a button to open modal of each bill", async () => {

            document.body.innerHTML = BillsUI({ data: await store.bills().list() })

            const iconEyes = screen.getAllByTestId('icon-eye')

            // Expect iconEyes exists
            expect(iconEyes).toBeTruthy()
        })
    })
})
