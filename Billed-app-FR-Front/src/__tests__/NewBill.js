/**
 * @jest-environment jsdom
 */

import { screen, waitFor, fireEvent } from "@testing-library/dom"
import { localStorageMock } from "../__mocks__/localStorage.js";
import NewBillUI from "../views/NewBillUI.js"
import NewBill from "../containers/NewBill.js"
import store from "../__mocks__/store.js";
import user from '@testing-library/user-event';
import { ROUTES } from "../constants/routes"

describe("Given I am connected as an employee", () => {
    describe("When I am on NewBill Page", () => {

        let onNavigate
        beforeAll(async () => {
            // Mock onNavigate function
            onNavigate = (pathname) => {
                document.body.innerHTML = ROUTES({ pathname })
            }

            // add localStorage to window
            Object.defineProperty(window, 'localStorage', { value: localStorageMock });

            // set user to Employee
            window.localStorage.setItem('user', JSON.stringify({
                type: 'Employee',
                email: 'a@a'
            }));
        });


        /**
         * Tests the redirection to the bills listing page after a successful addition 
         * of a new bill.
         *
         * @name RedirectionTest
         * @async
         *
         * @description
         * This test checks if a redirection to the bills listing page is performed 
         * after a successful addition of a new bill. To do this, it simulates the 
         * addition of a new bill by triggering change events on the necessary fields 
         * and clicking on the send button. Then, it checks if the bills listing page 
         * is displayed.
         */
        it("There should be a redirection to the bills listing page if a new bill has been added successfully", async () => {
            const html = NewBillUI()
            document.body.innerHTML = html

            // Init some values
            const fileJpg = new File(['bill'], 'bill.jpg', {
                type: 'image/jpg'
            });
            const date = '2023-05-10';
            const amount = '150';
            const VAT = '10';

            const newBill = new NewBill({ document, onNavigate, store, localStorage })
            newBill.type = "image/png";
            newBill.email = "a@a";

            // File upload by simulating a user’s file selection
            const handleChangeFile = jest.fn(newBill.handleChangeFile)
            const supportingFileInput = screen.getByTestId('file')
            supportingFileInput.addEventListener('change', (e) => handleChangeFile(e))
            user.upload(supportingFileInput, fileJpg);

            // Enter date by simulating user input in a datepicker field
            const datePickerInput = screen.getByTestId('datepicker')
            user.type(datePickerInput, date);

            // Enter amounts by simulating user input in a field
            const amountInput = screen.getByTestId('amount')
            user.type(amountInput, amount);

            // Enter VAT percentage by simulating user input in a field
            const VATpercentageInput = screen.getByTestId('pct')
            user.type(VATpercentageInput, VAT);


            const handleSubmit = jest.fn(newBill.handleSubmit)

            const submitBtn = screen.getByText("Envoyer")

            submitBtn.addEventListener('click', () => handleSubmit)

            fireEvent.click(submitBtn)

            await waitFor(() => {
                expect(screen.getByText('Mes notes de frais')).toBeTruthy()
            })
        })


        /**
         * Tests if a function correctly checks whether the input file is an image 
         * and warns the user accordingly.
         *
         * @name FileCheckTest
         * @async
         *
         * @description
         * This test checks if a function correctly verifies that the input file is 
         * indeed an image and warns the user accordingly. To do this, it simulates 
         * the addition of a GIF file and a JPG file by triggering a change event on 
         * the file input. Then, it checks if the file input has the "is-invalid" class 
         * added after the upload.
         */
        it("There are a function that checks whether the file added as input is indeed an image and warns the user accordingly", async () => {
            const html = NewBillUI()
            document.body.innerHTML = html

            // Create new NewBill container
            const newBill = new NewBill({ document, onNavigate, store, localStorage })

            // Mock handleChangeFile function
            const handleChangeFile = jest.fn(newBill.handleChangeFile)

            // Get supportingFileInput
            const supportingFileInput = screen.getByTestId('file')
            // Add event listener on supportingFileInput
            supportingFileInput.addEventListener('change', (e) => handleChangeFile(e))

            // Creation of a gif file for testing 
            const fileGif = new File(['bill'], 'bill.gif', {
                type: 'image/gif'
            });
            // Creation of a jpg file for testing
            const fileJpg = new File(['bill'], 'bill.jpg', {
                type: 'image/jpg'
            });

            // It simulates an upload action with a GIF file and checks if the "supportingFileInput" input has the "is-invalid" class added after the upload.
            user.upload(supportingFileInput, fileGif);
            expect(supportingFileInput.classList.contains('is-invalid')).toBeTruthy()

            // It simulates an upload action with a JPG file and checks if the "supportingFileInput" input doesn't have the "is-invalid" class after the upload.
            user.upload(supportingFileInput, fileJpg);
            expect(supportingFileInput.classList.contains('is-invalid')).not.toBeTruthy()
        })
    })
})
