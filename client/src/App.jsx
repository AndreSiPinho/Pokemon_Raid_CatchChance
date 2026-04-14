useEffect(() => {
  fetch("http://localhost:3001/")
    .then(res => res.text())
    .then(data => console.log(data));
}, []);