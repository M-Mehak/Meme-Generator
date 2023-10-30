import React from "react";

export default function Meme() {

  const [meme, setMeme] = React.useState({
    topText: "",
    bottomText: "",
    randomImage: "",
  });

  const [allMemes, setAllMemes] = React.useState([]);


  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://api.imgflip.com/get_memes");
        const data = await res.json();
        setAllMemes(data.data.memes);
      } catch (error) {
        console.error("API Error: " + error);
      }
    };

    fetchData();
  }, []);



  function getMemeImage() {
    if (allMemes.length > 0 && meme.topText.trim() !== "" && meme.bottomText.trim() !== "") {
      const memesArray = allMemes;
      const randomNumber = Math.floor(Math.random() * memesArray.length);
      const url = memesArray[randomNumber].url;
      setMeme((prevMeme) => ({
        ...prevMeme,
        randomImage: url,
      }));
    } else {
      alert("Please fill in both top and bottom text.");
    }
  }


  function handleChange(event) {
    const { name, value } = event.target;
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }));
  }
  

  return (
    <main>
      <div className="form">
        <input
          type="text"
          placeholder="Top text"
          className="form--input"
          name="topText"
          value={meme.topText}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Bottom text"
          className="form--input"
          name="bottomText"
          value={meme.bottomText}
          onChange={handleChange}
        />
        <button className="form-button" onClick={getMemeImage}>
          Get a new meme image 🖼
        </button>
      </div>
      <div className="meme">
        {meme.randomImage && (
          <>
            <img src={meme.randomImage} className="meme-img" />
            <h2 className="meme-text top">{meme.topText}</h2>
            <h2 className="meme-text bottom">{meme.bottomText}</h2>
          </>
        )}
      </div>
    </main>
  );
}