/**
 * ─────────────────────────────────────────────────────────────
 *  YOUR SETTINGS. Edit the values between the quotes.
 * ─────────────────────────────────────────────────────────────
 *
 *  • Leave a field as "" (empty quotes) to hide it on the site.
 *    Nothing broken, fake or "coming soon" is ever shown.
 *  • Save the file on GitHub ("Commit changes") and Vercel
 *    updates the live site in a minute or two.
 */

export const siteConfig = {
  /** Your live address, e.g. "https://sarthaksighat.com". Used for search and link previews. */
  siteUrl: "",

  contact: {
    /** e.g. "hello@yourdomain.com" */
    email: "ssighat96@gmail.com",
    /** e.g. "https://www.linkedin.com/in/your-profile" */
    linkedin: "https://www.linkedin.com/in/sarthaksighat/",
    /**
     * Your CV as a PDF. Upload the PDF into the /public folder on GitHub,
     * then write its name here with a slash, e.g. "/sarthak-sighat-cv.pdf".
     * If the file isn't there, the download button stays hidden.
     */
    cv: "",
    /** e.g. "https://calendly.com/your-name". Optional. */
    booking: "",
  },

  /**
   * PHOTOS. Upload images into /public/photos on GitHub, then write the path here,
   * e.g. "/photos/portrait.jpg". Use real photos of you only.
   * "alt" describes the photo for people using screen readers.
   * Empty slots are hidden (the portrait shows your initials instead).
   */
  photos: {
    portrait: { src: "", alt: "Portrait of Sarthak Sighat" },
    atWork: { src: "", alt: "" },
    travel: { src: "", alt: "" },
    mumbai: { src: "", alt: "" },
  },

  /** EDUCATION. Shown in "The Person" once the degree is filled in. */
  education: {
    degree: "", // e.g. "B.E. in Electronics Engineering"
    institution: "", // e.g. "University of Mumbai"
    years: "", // e.g. "2015–2019"
  },

  /**
   * A few lines in your own words for "The Person". Optional.
   * If empty, the site uses a short bio built only from facts you've already given.
   */
  bioInYourWords: "",
};
