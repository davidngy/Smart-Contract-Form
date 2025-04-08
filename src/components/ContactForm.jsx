import { useRef, useState } from "react";
import { validateForm } from "../utils/validation";
import React from "react";
import emailjs from '@emailjs/browser';
import SuccessModal from "./SuccessModal";

function ContactForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [isVisible, setIsVisible] = useState(false);

    const form = useRef();

    function submitHandler(e) {
        e.preventDefault();
        
        const errors = validateForm({name, email, message});

        if(Object.keys(errors).length === 0) {
            emailjs.sendForm(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                form.current,
                {
                    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
                }
            )
            .then(
                () => {
                    console.log("sent succesfully");
                    setIsVisible(true);
                    setName("");
                    setEmail("");
                    setMessage("");
                },
                (error) => {
                    console.log(error.text);
                },
            );
        } else {
            console.log(errors)
        }

    }
    return (
        <div className="container px-4 mx-auto">
            <div className="mx-auto">
                <div className="max-w-md mx-auto px-8 py-6 bg-gray-100 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Us</h2>
                <form ref={form} onSubmit={submitHandler}>
                    <div className="mb-4">
                    <label className="block text-gray-800 mb-1" htmlFor="name">Your Name</label>
                    <input
                        className="w-full px-4 py-2 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 transition duration-300"
                        placeholder="Enter your name"
                        name="name"
                        value={name}
                        type="text"
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                    />
                    </div>
                    <div className="mb-4">
                    <label className="block text-gray-800 mb-1" htmlFor="email">Your Email</label>
                    <input
                        className="w-full px-4 py-2 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 transition duration-300"
                        placeholder="Enter your email"
                        name="email"
                        value={email}
                        id="email"
                        type="email"
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                    </div>
                    <div className="mb-4">
                    <label className="block text-gray-800 mb-1" htmlFor="message"
                        >Your Message</label
                    >
                    <textarea
                        className="w-full px-4 py-2 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 transition duration-300"
                        rows="4"
                        placeholder="Enter your message"
                        name="message"
                        value={message}
                        id="message"
                        onChange={(e) => {
                            setMessage(e.target.value);
                        }}
                    ></textarea>
                    </div>
                    <button
                    className="w-full bg-yellow-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-yellow-400 transition duration-300"
                    type="submit"
                    >
                    Send Message
                    </button>
                    {isVisible == true && (
                        <SuccessModal onClose={() => setIsVisible(false)} />
                    )}
                </form>
                </div>
            </div>
        </div>
    )
}

export default ContactForm;

