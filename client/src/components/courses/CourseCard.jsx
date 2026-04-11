function CourseCard({ title = 'Course title', description = 'Course description' }) {
  return (
    <article>
      <h3>{title}</h3>
      <p>{description}</p>
    </article>
  )
}

export default CourseCard
