/**
 * Título de sección con introducción opcional.
 *
 * @param {Object} props
 * @param {string} props.id Id del h2, para enlazarlo con `aria-labelledby` de la sección.
 * @param {string} props.title
 * @param {string} [props.intro]
 */
export default function SectionHead({ id, title, intro }) {
  return (
    <div className="section-head">
      <h2 id={id}>{title}</h2>
      {intro && <p>{intro}</p>}
    </div>
  )
}
