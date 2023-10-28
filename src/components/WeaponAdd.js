import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  OutlinedInput,
  Radio,
  Box,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
} from "@mui/material";
import axios from "axios";

const WeaponAdd = (e) => {
  const [type, setType] = useState("AR");
  const [operators, setOperators] = useState([]);
  const [operator, setOperator] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:4000/operator/all")
      .then((response) => {
        response.data.map((item) => {
          const newItem = { name: item.name, id: item._id };
          setOperators((prevArray) => [...prevArray, newItem]);
        });
      })
      .catch((e) => console.error("Error: ", e));
  }, []);

  const handleChange = (e) => {
    setType(e.target.value);
  };

  const handleOperator = (e) => {
    setOperator(e.target.value);
  };

  const getoperatorOptionNames = () => {
    return operator.map((selectedId) => {
      const selectedOption = operators.find(
        (option) => option.id === selectedId
      );
      return selectedOption ? selectedOption.name : "";
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const elements = e.target.elements;

    const formData = {
      type,
      primary: elements.primary.value,
      name: elements.name.value,
      capacity: elements.capacity.value,
      damage: elements.damage.value,
      rate: elements.rate.value,
      operator,
    };

    await axios
      .post("http://localhost:4000/weapon/insert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: formData,
      })
      .then(() => navigate("/weapon"))
      .catch((e) => {
        console.error("Error: ", e);
      });
  };

  return (
    <Box
      component="form"
      className="weapon-form"
      onSubmit={(e) => handleSubmit(e)}>
      <FormControl>
        <FormLabel>무기 추가하기</FormLabel>
        <FormControl>
          <InputLabel id="type">타입</InputLabel>
          <Select
            labelId="type"
            id="type"
            value={type}
            label="type"
            onChange={handleChange}>
            <MenuItem value="AR">돌격소총(AR)</MenuItem>
            <MenuItem value="SG">산탄총(SG)</MenuItem>
            <MenuItem value="SMG">기관단총(SMG)</MenuItem>
            <MenuItem value="LMG">경기관총(LMG)</MenuItem>
            <MenuItem value="DMR">저격소총(DMR)</MenuItem>
            <MenuItem value="SR">저격소총(SR)</MenuItem>
            <MenuItem value="Pistol">권총(Pistol)</MenuItem>
            <MenuItem value="MP">기관권총(Machine Pistol)</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel id="primary">주무기 여부</FormLabel>
          <RadioGroup
            aria-labelledby="primary"
            name="primary"
            defaultValue="primary">
            <FormControlLabel
              value="primary"
              control={<Radio />}
              label="주무기"
            />
            <FormControlLabel
              value="secondary"
              control={<Radio />}
              label="보조무기"
            />
          </RadioGroup>
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="name">이름</InputLabel>
          <OutlinedInput id="name" label="name" name="name" required />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="capacity">탄약</InputLabel>
          <OutlinedInput
            id="capacity"
            label="capacity"
            name="capacity"
            type="number"
            required
            inputProps={{ min: 0 }}
          />
          <FormHelperText id="capacity">약실을 빼고 입력하세요</FormHelperText>
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="damage">데미지</InputLabel>
          <OutlinedInput
            id="damage"
            label="damage"
            name="damage"
            type="number"
            required
            inputProps={{ min: 0, max: 100 }}
          />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="rate">연사 속도</InputLabel>
          <OutlinedInput
            id="rate"
            label="rate"
            name="rate"
            required
            type="number"
            inputProps={{ min: 0 }}
          />
        </FormControl>
        {/* 오퍼레이터 추가하기 autocomplete 사용 혹은 오퍼레이터에서만 무기를 추가하도록 */}
        <FormControl>
          <InputLabel htmlFor="operator">사용 오퍼레이터</InputLabel>
          <Select
            multiple
            value={operator}
            label="오퍼레이터 선택"
            labelId="operator"
            input={<OutlinedInput label="Tag" />}
            renderValue={() => getoperatorOptionNames().join(", ")}
            onChange={handleOperator}>
            {operators.map((item) => (
              <MenuItem value={item.id}>
                <Checkbox checked={operator.indexOf(item.id) > -1} />
                <ListItemText primary={item.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Input type="submit" value="추가하기" />
      </FormControl>
    </Box>
  );
};

export default WeaponAdd;
