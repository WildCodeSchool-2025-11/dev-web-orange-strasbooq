import emailjs from "@emailjs/browser";
import type React from "react";
import { useRef, useState } from "react";

export default function Contact() {
	const [formStatus, setFormStatus] = useState<
		"idle" | "sending" | "success" | "error"
	>("idle");
	const formRef = useRef<HTMLFormElement>(null);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setFormStatus("sending");

		if (formRef.current) {
			emailjs;
			emailjs
				.sendForm(
					"service_o21uzov",
					"template_z58shdo",
					formRef.current,
					"LXei9u65TQbO4eGJq",
				)

				.then(() => {
					setFormStatus("success");
					formRef.current?.reset();
				})
				.catch(() => {
					setFormStatus("error");
				});
		}
	};

	return (
		<div className="container mx-auto px-4 sm:px-6 py-8">
			<h1 className="text-3xl font-bold mb-6 text-rose-700">Nous contacter</h1>
			<form ref={formRef} onSubmit={handleSubmit} className="max-w-lg mx-auto">
				<div className="mb-4">
					<label
						className="block text-gray-700 font-semibold mb-2"
						htmlFor="name"
					>
						Nom
					</label>
					<input
						type="text"
						id="name"
						name="user_name"
						required
						className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-rose-500"
					/>
				</div>
				<div className="mb-4">
					<label
						className="block text-gray-700 font-semibold mb-2"
						htmlFor="email"
					>
						Email
					</label>
					<input
						type="email"
						id="email"
						name="user_email"
						required
						className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-rose-500"
					/>
				</div>
				<div className="mb-4">
					<label
						className="block text-gray-700 font-semibold mb-2"
						htmlFor="message"
					>
						Message
					</label>
					<textarea
						id="message"
						name="message"
						required
						className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-rose-500"
						rows={5}
					></textarea>
				</div>
				<button
					type="submit"
					disabled={formStatus === "sending"}
					className="px-8 py-3 bg-[#185227] hover:bg-green-600 text-white rounded text-lg"
				>
					{formStatus === "sending" ? "Envoi..." : "Envoyer le message"}
				</button>
				{formStatus === "success" && (
					<p className="mt-4 text-green-600">Message envoyé avec succès ! ✨</p>
				)}
				{formStatus === "error" && (
					<p className="mt-4 text-red-600">
						Une erreur est survenue, réessayez plus tard.
					</p>
				)}
			</form>
		</div>
	);
}
