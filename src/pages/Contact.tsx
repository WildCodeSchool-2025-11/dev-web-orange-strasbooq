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
		<div className="container mx-auto px-4 sm:px-6 py-20">
			<div>
				<h1 className="text-center text-3xl font-bold mb-10 text-green-700">
					StrasFleurs, comment nous joindre
				</h1>
				<p className="text-gray-600 text-center mb-8">
					StrasFleurs vous accueille pour vous faire découvrir tout notre
					univers : fleurs, plantes, accessoires, bouquets, compositions pour
					toutes les occasions de la vie. N'hésitez pas à nous appeler pour vous
					faire conseiller sur les événements de la vie : naissance, deuil,
					mariage, anniversaire. Service aux entreprises, livraison à domicile 7
					jours sur 7 toute l'année.
				</p>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
				{/* Left — Contact Form */}
				<section className="bg-white rounded-2xl shadow-md p-8">
					<h2 className="text-2xl font-bold text-gray-800 mb-2">
						Nous contacter
					</h2>
					<p className="text-gray-600 mb-1">
						Pour toute demande de contact : informations, réclamations,
						partenariats...
					</p>
					<p className="text-gray-600 mb-6">
						Merci de nous envoyer une demande par email via le formulaire de
						contact
					</p>
					<form ref={formRef} onSubmit={handleSubmit}>
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
								className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
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
								className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
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
								className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
								rows={5}
							/>
						</div>
						<button
							type="submit"
							disabled={formStatus === "sending"}
							className="w-full px-8 py-3 bg-[#185227] hover:bg-green-600 text-white rounded-lg text-lg cursor-pointer transition-colors"
						>
							{formStatus === "sending" ? "Envoi..." : "Envoyer le message"}
						</button>
						{formStatus === "success" && (
							<p className="mt-4 text-green-600 text-center">
								Message envoyé avec succès ! ✨
							</p>
						)}
						{formStatus === "error" && (
							<p className="mt-4 text-red-600">
								Une erreur est survenue, réessayez plus tard.
							</p>
						)}
					</form>
				</section>

				{/* Right — Map & Info */}
				<section className="bg-white rounded-2xl shadow-md p-8 flex flex-col">
					<h2 className="text-2xl font-bold text-gray-800 mb-4">
						Nous trouver
					</h2>
					<div className="rounded-xl overflow-hidden mb-4">
						<iframe
							className="w-full"
							height="300"
							style={{ border: 0 }}
							loading="lazy"
							allowFullScreen
							referrerPolicy="no-referrer-when-downgrade"
							src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2639.6!2d7.7467!3d48.5734!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4796c8495e18b2c1%3A0x971c427e7ab0ec6f!2s2%20Rue%20de%20B%C3%A2le%2C%2067100%20Strasbourg!5e0!3m2!1sfr!2sfr"
							title="Google Maps"
						/>
					</div>
					<p className="text-gray-700 font-semibold">
						2 Rue de Bâle,
						<br /> 67100 Strasbourg, France
					</p>
					<p className="text-gray-600 mb-6">+33.6.74.56.88.44</p>

					<h3 className="text-lg font-bold text-gray-800 mb-3">
						Horaires d'ouverture
					</h3>
					<div className="overflow-x-auto">
						<table className="w-full text-sm text-center border-collapse">
							<thead>
								<tr className="bg-green-700 text-white">
									<th className="py-2 px-2">Lundi</th>
									<th className="py-2 px-2">Mardi</th>
									<th className="py-2 px-2">Mercredi</th>
									<th className="py-2 px-2">Jeudi</th>
									<th className="py-2 px-2">Vendredi</th>
									<th className="py-2 px-2">Samedi</th>
									<th className="py-2 px-2">Dimanche</th>
								</tr>
							</thead>
							<tbody className="text-gray-700">
								<tr className="border-b border-gray-200">
									<td className="py-2">09:00</td>
									<td className="py-2">09:00</td>
									<td className="py-2">09:00</td>
									<td className="py-2">09:00</td>
									<td className="py-2">09:00</td>
									<td className="py-2">09:00</td>
									<td className="py-2">10:00</td>
								</tr>
								<tr className="border-b border-gray-200">
									<td className="py-2">12:30</td>
									<td className="py-2">12:30</td>
									<td className="py-2">12:30</td>
									<td className="py-2">12:30</td>
									<td className="py-2">12:30</td>
									<td className="py-2">12:30</td>
									<td className="py-2">12:30</td>
								</tr>
								<tr className="border-b border-gray-200">
									<td className="py-2">14:30</td>
									<td className="py-2">14:30</td>
									<td className="py-2">14:30</td>
									<td className="py-2">14:30</td>
									<td className="py-2">14:30</td>
									<td className="py-2">14:30</td>
									<td className="py-2">14:00</td>
								</tr>
								<tr>
									<td className="py-2">19:30</td>
									<td className="py-2">19:30</td>
									<td className="py-2">19:30</td>
									<td className="py-2">19:30</td>
									<td className="py-2">19:30</td>
									<td className="py-2">19:30</td>
									<td className="py-2">-</td>
								</tr>
							</tbody>
						</table>
					</div>
				</section>
			</div>
		</div>
	);
}
