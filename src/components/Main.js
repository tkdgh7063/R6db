import "../css/index.css";

const getRandomInt = (min, max) => {
  // min~max 중 랜덤 정수 추출
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const Main = () => {
  // 1년차부터 8년차까지의 랜덤 시즌의 이미지 추출
  // 각 연도에는 4개의 시즌이 존재하며 8년차는 시즌2까지 존재
  const year = getRandomInt(1, 8);
  let season = 0;

  if (year === 8) {
    season = getRandomInt(1, 2);
  } else {
    season = getRandomInt(1, 4);
  }
  return (
    <div className="main">
      <h1>R6sDB</h1>
      <img
        src={`http://localhost:4000/img/operation/r6s-seasons-y${year}s${season}.jpg`}
        alt="operation"
      />
    </div>
  );
};

export default Main;
