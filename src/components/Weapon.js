import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Button,
} from "@mui/material";
import { Typography } from "@mui/material";

export const Weapon = () => {
  const [Weapons, setWeapons] = useState([]);
  const [load, setLoad] = useState(false);

  const fetch = () => {
    axios
      .get(`http://localhost:4000/weapon/all`)
      .then((response) => {
        setWeapons(response.data);
        setLoad(true);
      })
      .catch((e) => console.error("Error: ", e));
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div className="weapon__container">
      <div className="weapon__weapon">
        {Weapons !== null ? (
          load === true ? (
            Weapons.map((weapon) => (
              <a href={`/weapon/${weapon._id}`}>
                <Card sx={{ maxWidth: 120, maxHeight: 240 }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      image={`http://localhost:4000/img/${weapon.image}`}
                    />
                    <CardContent
                      sx={{
                        maxWidth: 120,
                        maxHeight: 100,
                        padding: 3 / 4,
                      }}>
                      <Typography variant="h5" component="div" align="center">
                        {weapon.name}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
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
      <div className="weapon__button">
        <Button variant="outlined" component={Link} to="/weapon/insert">
          무기 추가하기
        </Button>
      </div>
    </div>
  );
};

export const WeaponDetail = () => {
  const id = useParams().id;
  const [weapon, setWeapon] = useState([]);
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();
  const type = {
    AR: "돌격소총(AR)",
    SG: "산탄총(SG)",
    DMR: "저격소총(DMR)",
    SR: "저격소총(SR)",
    SMG: "기관단총(SMG)",
    LMG: "경기관총(LMG)",
    Pistol: "권총(Pistol)",
    MP: "기관권총(Machine Pistol)",
  };

  const fetch = () => {
    axios
      .get(`http://localhost:4000/weapon/${id}`)
      .then((response) => {
        setWeapon(response.data);
        setLoad(true);
      })
      .catch((e) => console.error("Error: ", e));
  };

  useEffect(() => {
    fetch();
  }, []);

  const handleDelete = () => {
    axios
      .delete(`http://localhost:4000/weapon/${id}`)
      .then(() => navigate("/weapon"))
      .catch((e) => console.error("Error: ", e));
  };

  return (
    <div className="weapon-detail-container">
      <div className="weapon-detail">
        {weapon !== null ? (
          load === true ? (
            <div className="weapon-detail-information">
              <img
                className="weapon-detail__img"
                src={`http://localhost:4000/img/${weapon.image}`}
                alt="weapon_img"
              />
              <ul>
                <li>타입: {type[weapon.type]}</li>
                <li>{weapon.primary ? "주무기" : "보조무기"}</li>
                <li>이름: {weapon.name}</li>
                <li>탄약: {weapon.capacity}+1</li>
                <li>데미지: {weapon.damage}</li>
                <li>연사 속도: {weapon.rate}</li>
              </ul>
              <ul>
                사용 오퍼레이터
                <li>
                  {weapon.operator.map((item) => {
                    return (
                      <Button href={`/operator/${item._id}`}>
                        <img
                          src={`http://localhost:4000/img/${item.icon}`}
                          alt="icon"
                        />
                        {item.name}
                      </Button>
                    );
                  })}
                </li>
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
      <Button variant="outlined" component={Link} to={`/weapon/${id}/update`}>
        정보 수정하기
      </Button>
      <Button variant="outlined" onClick={handleDelete}>
        정보 삭제하기
      </Button>
    </div>
  );
};
