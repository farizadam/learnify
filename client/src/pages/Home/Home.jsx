import heroImg from '../../assets/hero.png'
import './Home.css'

function Home() {
  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="home-hero-copy">
          <h1 style={{ color: '#12202b' }}>Welcome to Learnify</h1>
          <p>Your all-in-one platform for streamlined learning and teaching.</p>
        </div>
        <img src={heroImg} alt="Learnify Hero" className="home-hero-img" />
      </section>
    </main>
  )
}

export default Home
