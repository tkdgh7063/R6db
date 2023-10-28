import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Button,
} from "@mui/material";
import { Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../css/index.css";

export const Map = () => {
  const [Maps, setMaps] = useState([]);
  const [load, setLoad] = useState(false);

  const fetch = () => {
    // 맵의 정보를 fetch
    axios.get(`http://localhost:4000/map/all`).then((res) => {
      setMaps(res.data);
      setLoad(true);
    });
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div className="map__container">
      <div className="map__map">
        {Maps !== null ? (
          load === true ? (
            Maps.map((map) => (
              <a href={`/map/${map._id}`}>
                <Card sx={{ maxWidth: 300, maxHeight: 440 }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      image={`http://localhost:4000/img/${map.image}`}
                    />
                    <CardContent
                      sx={{
                        maxWidth: 1,
                        maxHeight: 100,
                        padding: 3 / 4,
                      }}>
                      <Typography variant="h5" component="div" align="center">
                        {map.name}
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
      <div className="map__button">
        <Button variant="outlined" component={Link} to="/map/insert">
          맵 추가하기
        </Button>
      </div>
    </div>
  );
};

export const MapDetail = () => {
  const id = useParams().id;
  const [map, setMap] = useState([]);
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();

  const fetch = () => {
    axios.get(`http://localhost:4000/map/${id}`).then((response) => {
      setMap(response.data);
      setLoad(true);
    });
  };

  useEffect(() => {
    fetch();
  }, []);

  const handleDelete = () => {
    axios
      .delete(`http://localhost:4000/map/${id}`)
      .then(() => {
        navigate("/map");
      })
      .catch((e) => console.error("Error: ", e));
  };
  return (
    <div className="map-detail-container">
      <div className="map-detail">
        {map !== null ? (
          load === true ? (
            <div className="map-detail-information">
              <img
                className="map-detail__img"
                src={`http://localhost:4000/img/${map.image}`}
                alt="map_image"
              />
              <ul>
                <li>국가: {map.from}</li>
                <li>이름: {map.name}</li>
              </ul>
              <ul>
                {map.site.map((item, index) => (
                  <li>
                    사이트 {index + 1}: {item}
                  </li>
                ))}
              </ul>
              <ul>
                {map.spawn.map((item, index) => (
                  <li>
                    스폰위치 {index + 1}: {item}
                  </li>
                ))}
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
      <Button variant="outlined" component={Link} to={`/map/${id}/update`}>
        정보 수정하기
      </Button>
      <Button variant="outlined" onClick={handleDelete}>
        정보 삭제하기
      </Button>
    </div>
  );
};
