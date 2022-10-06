import React, { useState, useEffect } from 'react'

function Form() {
  const [meme, setMeme] = useState({
    topText: '',
    bottomText: '',
  })
  const [allMemeImages, setAllMemeImages] = useState()

  useEffect(() => {
    fetch('https://api.imgflip.com/get_memes')
      .then((res) => res.json())
      .then((data) => {
        setAllMemeImages(data)
      })
  }, [])

  function getMemeImage() {
    const memesArray = allMemeImages.data.memes
    const url = memesArray[Math.floor(Math.random() * memesArray.length)].url
    setMeme((prevEl) => {
      return {
        ...prevEl,
        randomImage: url,
      }
    })
  }

  function handleChange(event) {
    const { name, value } = event.target

    setMeme((prevEl) => {
      return {
        ...prevEl,
        [name]: value,
      }
    })
  }
  return (
    <div>
      <div className="form">
        <ul className="form-list">
          <li>
            <input
              className="inputs"
              type="text"
              id="upText"
              name="topText"
              onChange={handleChange}
              placeholder="Top Text"
            />
          </li>
          <li>
            <input
              className="inputs"
              type="text"
              id="bottom-text"
              name="bottomText"
              onChange={handleChange}
              placeholder="Bottom Text"
            />
          </li>
        </ul>
        <button id="submit" onClick={getMemeImage}>
          Get a new meme image
        </button>
        <div className="meme">
          <img src={meme.randomImage} className="meme--image" />
          <h2 className="meme--text top">{meme.topText}</h2>
          <h2 className="meme--text bottom">{meme.bottomText}</h2>
        </div>
      </div>
    </div>
  )
}

export default Form
