"use client"

import { useState } from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import Link from "next/link"

const PrivacyPolicy = () => {
  const [activeSection, setActiveSection] = useState("")

  const sections = [
    { id: "information", title: "Information We Collect" },
    { id: "cookies", title: "Cookies & Tracking" },
    { id: "third-party", title: "Third-Party Services" },
    { id: "images", title: "Use of Images" },
    { id: "protection", title: "Data Protection" },
    { id: "rights", title: "Your Rights" },
    { id: "changes", title: "Changes to Policy" },
    { id: "contact", title: "Contact" },
  ]

  interface Section {
    id: string;
    title: string;
  }

  const scrollToSection = (id: string): void => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setActiveSection(id)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar with Table of Contents */}
            <aside className="lg:w-1/4">
              <div className="bg-white p-6 rounded-lg shadow-sm sticky top-24">
                <h3 className="font-semibold text-lg mb-4">Table of Contents</h3>
                <nav>
                  <ul className="space-y-2">
                    {sections.map((section) => (
                      <li key={section.id}>
                        <button
                          onClick={() => scrollToSection(section.id)}
                          className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${activeSection === section.id ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100"
                            }`}
                        >
                          {section.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </aside>

            {/* Main Content */}
            <div className="lg:w-3/4">
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h1 className="text-3xl mb-10 font-bold text-gray-800 mb-2">Privacy Policy</h1>
                  <section id="information" className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-700 mb-4">1. Information We Collect</h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium text-lg text-gray-600">
                        1.1. Personal Data (Newsletter & Contact Form)
                      </h3>
                      <p className="mt-2 text-gray-600">
                        We collect certain personal information when you interact with our website, specifically when subscribing
                        to our newsletter or filling out our contact form. This information is voluntarily provided by you and is
                        used solely for communication and service-related purposes.
                      </p>
                      <ul className="list-disc list-inside mt-2 space-y-1 text-gray-600">
                        <li>
                          When subscribing to our newsletter, we collect your{" "}
                          <span className="font-medium">email address</span> to send you updates, news, and relevant content.
                          You can unsubscribe at any time by following the link in our emails.
                        </li>
                        <li>
                          When filling out our contact form, we collect your{" "}
                          <span className="font-medium">name, email, and message</span> to respond to your inquiries, provide
                          assistance, or address any concerns you may have.
                        </li>
                      </ul>
                      <p className="mt-2 text-gray-600">
                        We do not sell, rent, or share your personal data with third parties for marketing purposes.
                        Your information is stored securely and only retained for as long as necessary to fulfill its
                        intended purpose.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-medium text-lg text-gray-600">
                        1.2. Anonymous Usage Data (Google Analytics)
                      </h3>
                      <p className="mt-2 text-gray-600">
                        In order to improve our website and enhance user experience, we collect anonymized usage data
                        through Google Analytics. This information does not personally identify you but helps us understand
                        how visitors interact with our website.
                      </p>
                      <ul className="list-disc list-inside mt-2 space-y-1 text-gray-600">
                        <li>Pages visited and time spent on each page</li>
                        <li>Device type, browser, and operating system</li>
                        <li>General geographic location (based on IP address, which is anonymized)</li>
                        <li>Referral sources (how users found our website)</li>
                      </ul>
                      <p className="mt-2 text-gray-600">
                        This data is collected and processed in compliance with privacy regulations. You can manage or disable
                        tracking through your browser settings or opt out using Google’s tools.
                      </p>
                    </div>
                  </div>
                </section>


                <section id="cookies" className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-700 mb-4">2. Cookies and Tracking Technologies</h2>
                  <p className="text-gray-600">
                    We use cookies exclusively for Google Analytics to help us understand how visitors interact with our website. These cookies collect anonymized data, such as the number of visitors, the pages they view, and how they navigate through the site. This information allows us to improve our content and enhance user experience.

                    By using our website, you consent to the use of these cookies unless you choose to disable them. You can manage or disable cookies at any time through your browser settings. Please note that disabling cookies may affect the accuracy of analytics data but will not impact your ability to use our website.

                    For more information on how Google Analytics handles data, you can visit Google’s Privacy Policy.                  </p>
                </section>

                <section id="third-party" className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-700 mb-4">3. Third-Party Services</h2>
                  <p className="text-gray-600">
                    We use third-party service providers to manage our newsletter subscriptions and analytics. These providers help us deliver email communications, track user engagement, and analyze website traffic to improve our services. While we carefully select our partners to ensure they align with industry standards for data protection, we do not control how these third parties handle your personal data.

                    Each third-party provider operates under its own privacy policy and terms of service, which may differ from ours. We encourage you to review their privacy policies to understand how they collect, process, and store your information.

                    By using our website and subscribing to our newsletter, you acknowledge that your data may be processed by these external providers. We are not responsible for any privacy practices, security measures, or data handling policies employed by these third parties. If you have concerns about how your data is managed, we recommend adjusting your preferences directly with the relevant service provider or contacting them for further information.
                  </p>
                </section>
                <section id="images" className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-700 mb-4">4. Use of Images</h2>
                  <p className="text-gray-600">
                    We incorporate images from various sources, including <span className="font-medium">Unsplash</span> and other
                    royalty-free image providers, to enhance the visual appeal of our website. These images are used under the
                    respective licenses provided by their original creators, ensuring compliance with copyright and intellectual
                    property laws.
                  </p>
                  <p className="mt-2 text-gray-600">
                    While we make every effort to ensure that the images used on our platform are free for commercial use, we do
                    not claim ownership over them. The rights to each image remain with the original photographers, illustrators,
                    or content creators who have made them available through licensing agreements or public domain repositories.
                  </p>
                  <p className="mt-2 text-gray-600">
                    If you are the rightful owner of an image featured on our website and believe it has been used improperly, or
                    if you wish for it to be removed or credited differently, please reach out to us. We will promptly review your
                    request and take the necessary actions to respect your rights and ensure proper attribution.
                  </p>
                  <p className="mt-2 text-gray-600">
                    Additionally, any images uploaded by users to our platform (if applicable) should comply with copyright
                    regulations. By submitting images, users confirm that they have the necessary rights or permissions to use
                    and share them. We reserve the right to remove any content that violates copyright laws or our policies.
                  </p>
                </section>


                <section id="protection" className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-700 mb-4">5. Data Protection</h2>
                  <p className="text-gray-600">
                    We take the security of your personal data seriously and implement appropriate technical and organizational measures to protect it from unauthorized access, alteration, disclosure, or destruction. Our security protocols include encryption, access controls, and regular monitoring to prevent potential vulnerabilities.
                  </p>
                  <p className="text-gray-600">
                    We do not share your personal data with third parties except when it is necessary to provide our services, comply with legal obligations, or protect our rights. Any data shared with third-party service providers is limited to the extent required and subject to confidentiality agreements to ensure your privacy remains protected.
                  </p>
                  <p className="text-gray-600">
                    Despite our efforts to safeguard your information, no method of transmission over the internet or electronic storage is entirely secure. Therefore, while we strive to protect your data, we cannot guarantee absolute security. If you have any concerns regarding data protection, please contact us for further information on our security practices.
                  </p>
                </section>


                <section id="rights" className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-700 mb-4">6. Your Rights</h2>
                  <p className="text-gray-600">
                    We respect your rights regarding your personal data and strive to ensure transparency in how we collect, store, and use your information. Under applicable data protection laws, you have several rights that allow you to maintain control over your personal data.
                  </p>

                  <ul className="list-disc list-inside mt-2 space-y-2 text-gray-600">
                    <li>
                      <span className="font-medium">Right to Access:</span> You have the right to request a copy of the personal data we have collected about you and how it is being used.
                    </li>
                    <li>
                      <span className="font-medium">Right to Correction:</span> If any of the information we hold about you is incorrect or incomplete, you may request that we update or rectify it.
                    </li>
                    <li>
                      <span className="font-medium">Right to Deletion:</span> You may request the deletion of your personal data, subject to certain legal obligations that require us to retain some information.
                    </li>
                    <li>
                      <span className="font-medium">Right to Object to Processing:</span> You can object to the processing of your data for certain purposes, such as direct marketing or analytics tracking.
                    </li>
                    <li>
                      <span className="font-medium">Right to Restriction of Processing:</span> In some cases, you can request that we limit the processing of your data rather than delete it completely.
                    </li>
                    <li>
                      <span className="font-medium">Right to Data Portability:</span> Where applicable, you can request a copy of your data in a structured, commonly used, and machine-readable format for transfer to another service.
                    </li>
                    <li>
                      <span className="font-medium">Right to Withdraw Consent:</span> If we process your data based on your consent, you may withdraw that consent at any time.
                    </li>
                  </ul>

                  <p className="mt-2 text-gray-600">
                    To exercise any of these rights, please contact us with your request. We will respond within the legally required time frame and ensure that your rights are upheld. Please note that some requests may require identity verification to protect your data from unauthorized access.
                  </p>

                  <p className="mt-2 text-gray-600">
                    Additionally, if you have concerns about how your data is being handled, you have the right to lodge a complaint with a relevant data protection authority in your jurisdiction.
                  </p>
                </section>


                <section id="changes" className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-700 mb-4">7. Changes to This Policy</h2>
                  <p className="text-gray-600">
                    We may update this Privacy Policy periodically to reflect changes in our practices, legal requirements, or technological advancements. Any modifications will be posted on this page, and the "Last Updated" date at the bottom of the policy will be revised accordingly.
                  </p>

                  <p className="mt-2 text-gray-600">
                    We encourage you to review this Privacy Policy regularly to stay informed about how we protect your personal data and ensure compliance with relevant regulations. Significant changes that materially impact how we handle your information may be communicated through additional notices, such as email notifications or banners on our website.
                  </p>

                  <p className="mt-2 text-gray-600">
                    Your continued use of our website after changes to this policy have been posted constitutes your acknowledgment and acceptance of the updated terms. If you do not agree with any modifications, you should discontinue using our services and may request the deletion of your personal data.
                  </p>

                  <p className="mt-2 text-gray-600">
                    If you have any questions or concerns regarding updates to this Privacy Policy, please contact us for further clarification.
                  </p>
                </section>


                <section id="contact" className="mb-6">
                  <h2 className="text-2xl font-semibold text-gray-700 mb-4">8. Contact</h2>
                  <p className="text-gray-600">
                    If you have any questions, concerns, or requests regarding this Privacy Policy or how we handle your personal data,
                    we encourage you to reach out to us. We are committed to addressing your inquiries and ensuring transparency in our
                    data protection practices.
                  </p>
                  <p className="mt-2 text-gray-600">
                    You can contact us through our{" "}
                    <Link href="/contact" className="text-blue-600 hover:underline">Contact Page</Link>,
                    where you can submit your questions, report issues, or request modifications to your personal data.
                    If your request involves sensitive information, we may require identity verification to ensure
                    your privacy and security.
                  </p>

                  <p className="mt-2 text-gray-600">
                    We value your privacy and are dedicated to maintaining an open line of communication with our users.
                    If you believe your data has been misused or have concerns about our compliance with data protection laws,
                    please reach out to us, and we will take appropriate action as needed.
                  </p>
                </section>

              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default PrivacyPolicy

