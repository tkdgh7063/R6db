import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {
  FormControl,
  InputLabel,
  FormLabel,
  OutlinedInput,
  TextField,
  Box,
  Button,
  IconButton,
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import axios from "axios";
import "../css/index.css";

const MapAdd = () => {
  const [spawns, setSpawns] = useState([""]);
  const [sites, setSites] = useState([""]);
  const navigate = useNavigate();

  const handleSpawnsChange = (event, index) => {
    const { value } = event.target;
    const updatedInputs = [...spawns];
    updatedInputs[index] = value;
    setSpawns(updatedInputs);
  };
  const handleSitesChange = (event, index) => {
    const { value } = event.target;
    const updatedInputs = [...sites];
    updatedInputs[index] = value;
    setSites(updatedInputs);
  };

  const handleSpawnsAddField = () => {
    const lastInput = spawns[spawns.length - 1];
    if (lastInput.trim() !== "") {
      setSpawns([...spawns, ""]);
    }
  };
  const handleSitesAddField = () => {
    const lastInput = sites[sites.length - 1];
    if (lastInput.trim() !== "") {
      setSites([...sites, ""]);
    }
  };

  const handleSpawnRemoveField = (index) => {
    const updatedInputs = [...spawns];
    updatedInputs.splice(index, 1);
    setSpawns(updatedInputs);
  };
  const handleSitesRemoveField = (index) => {
    const updatedInputs = [...sites];
    updatedInputs.splice(index, 1);
    setSites(updatedInputs);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const elements = e.target.elements;
    const name = elements.name.value.toLowerCase();
    const formData = {
      from: elements.from.value,
      name: name.charAt(0).toUpperCase() + name.slice(1),
      spawn: spawns,
      site: sites,
    };

    await axios
      .post("http://localhost:4000/map/insert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: formData,
      })
      .then(() => navigate("/map"))
      .catch((e) => {
        console.error("Error: ", e);
      });
  };

  return (
    <Box
      component="form"
      className="map-form"
      onSubmit={(e) => handleSubmit(e)}>
      <FormLabel>맵 추가하기</FormLabel>
      <FormControl>
        <InputLabel htmlFor="from">국가</InputLabel>
        <OutlinedInput id="from" label="from" name="from" required />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="name">이름</InputLabel>
        <OutlinedInput id="name" label="name" name="name" required />
      </FormControl>
      {/* 스폰지역 추가 */}
      <div className="map__spawn">
        <FormLabel>스폰 지역</FormLabel>
        {spawns.map((input, index) => (
          <div key={index}>
            <TextField
              key={index}
              label={`스폰지역 ${index + 1}`}
              variant="outlined"
              margin="normal"
              name="spawn"
              required
              onChange={(event) => handleSpawnsChange(event, index)}
            />
            {index !== 0 && index === spawns.length - 1 && (
              <IconButton onClick={() => handleSpawnRemoveField(index)}>
                <DeleteIcon />
              </IconButton>
            )}
          </div>
        ))}
        <Button variant="outlined" onClick={handleSpawnsAddField}>
          Add Field
        </Button>
      </div>
      {/* 사이트 추가 */}
      <div className="map__site">
        <FormLabel>사이트</FormLabel>
        {sites.map((input, index) => (
          <div key={index}>
            <TextField
              key={index}
              label={`사이트 ${index + 1}`}
              variant="outlined"
              margin="normal"
              name="site"
              placeholder="1층 다락방, 1층 아이방"
              helperText="층, 지명 순으로 입력하세요"
              required
              onChange={(event) => handleSitesChange(event, index)}
            />
            {index !== 0 && index === sites.length - 1 && (
              <IconButton onClick={() => handleSitesRemoveField(index)}>
                <DeleteIcon />
              </IconButton>
            )}
          </div>
        ))}
        <Button variant="outlined" onClick={handleSitesAddField}>
          Add Field
        </Button>
      </div>
      <Button type="submit" variant="contained">
        맵 추가하기
      </Button>
    </Box>
  );
};

export default MapAdd;
