import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardMedia,
  CardActionArea,
  CardContent,
  Button,
} from "@mui/material";
import { Typography } from "@mui/material";
import axios from "axios";
import "../css/index.css";

export const Oper = () => {
  const [Operators, setOperators] = useState([]); // 오퍼레이터의 목록 fetch
  const [load, setLoad] = useState(false); // 홈페이지 로딩 여부

  const fetch = () => {
    // DB내의 오퍼레이터의 목록 모두를 가져옴
    // 가져온 데이터를 Operators에 넣고 로딩여부를 true로 변경
    axios.get(`http://localhost:4000/operator/all`).then((response) => {
      setOperators(response.data);
      setLoad(true);
    });
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div className="operator__container">
      <div className="operator__operator">
        {Operators !== null ? (
          load === true ? (
            Operators.map((operator) => (
              <a href={`/operator/${operator._id}`}>
                <Card sx={{ maxWidth: 120, maxHeight: 240 }}>
                  <CardMedia
                    component="img"
                    className="operator__image"
                    image={`http://localhost:4000/img/${operator.image}`}
                  />
                  <CardMedia
                    className="operator__icon"
                    component="img"
                    image={`http://localhost:4000/img/${operator.icon}`}
                  />
                  <CardContent
                    sx={{
                      maxWidth: 120,
                      maxHeight: 100,
                      padding: 3 / 4,
                    }}>
                    <Typography variant="h5" component="div" align="center">
                      {operator.name.toUpperCase()}
                    </Typography>
                  </CardContent>
                </Card>
              </a>
            ))
          ) : (
            <div>Loading...</div>
          )
        ) : (
          <div>NULL</div>
        )}
      </div>
      <div className="operator__button">
        <Button variant="outlined" component={Link} to="/operator/insert">
          오퍼 추가하기
        </Button>
      </div>
    </div>
  );
};

export const OperDetail = () => {
  const id = useParams().id;
  const [operator, setOperator] = useState([]);
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();

  const fetch = () => {
    axios
      .get(`http://localhost:4000/operator/${id}`)
      .then((response) => {
        setOperator(response.data);
        setLoad(true);
      })
      .catch((e) => console.error("Error: ", e));
  };

  useEffect(() => {
    fetch();
  }, []);

  const handleDelete = () => {
    axios
      .delete(`http://localhost:4000/operator/${id}`)
      .then(() => navigate("/operator"))
      .catch((e) => console.error("Error: ", e));
  };

  return (
    <div className="operator-detail-container">
      <div className="operator-detail">
        {operator !== null ? (
          load === true ? (
            <div className="operator-detail-information">
              <img
                src={`http://localhost:4000/img/${operator.image}`}
                alt="operator"
                className="operator-detail__image"
              />
              <ul>
                <li>
                  아이콘:
                  <img
                    alt="icon"
                    className="operator-detail__icon"
                    src={`http://localhost:4000/img/${operator.icon}`}
                  />
                </li>
                <li>국가: {operator.from}</li>
                <li>이름: {operator.name}</li>
                <li>소속: {operator.squad}</li>
                <li>진영: {operator.side === "ATK" ? "공격팀" : "수비팀"}</li>
              </ul>
              <ul>
                무기
                {operator.weapon.map((item) => {
                  return (
                    <Button href={`/weapon/${item._id}`}>{item.name}</Button>
                  );
                })}
              </ul>
              <ul>
                <li>특수능력: {operator.ability}</li>
                <li>특수능력 설명: {operator.description}</li>
              </ul>
            </div>
          ) : (
            <div>Loading...</div>
          )
        ) : (
          // 그런 이름은 없음
          <div>NULL</div>
        )}
      </div>
      <Button variant="outlined" component={Link} to={`/operator/${id}/update`}>
        정보 수정하기
      </Button>
      <Button variant="outlined" onClick={handleDelete}>
        정보 삭제하기
      </Button>
    </div>
  );
};
