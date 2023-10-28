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

const OperatorAdd = () => {
  const [side, setSide] = useState("ATK"); // 진영 초기값
  const [primaryList, setPrimaryList] = useState([]); // 주무기 목록
  const [secondList, setSecondList] = useState([]); // 보조무기 목록
  const [primary, setPrimary] = useState([]); // 선택 주무기 목록
  const [secondary, setSecondary] = useState([]); // 선택 보조무기 목록
  const navigate = useNavigate();

  useEffect(() => {
    // 무기의 목록을 fetch와서 주무기면 주무기 목록에, 보조무기면 보조무기 목록에 설정
    axios
      .get("http://localhost:4000/weapon/all")
      .then((response) =>
        response.data.map((item) => {
          const newItem = { name: item.name, id: item._id };
          if (item.primary === true) {
            setPrimaryList((prevArray) => [...prevArray, newItem]);
          } else {
            setSecondList((prevArray) => [...prevArray, newItem]);
          }
        })
      )
      .catch((e) => console.error("Error: ", e));
  }, []);

  const handleChange = (e) => {
    // 진영의 값이 바뀌는 경우 이벤트핸들러
    setSide(e.target.value);
  };

  const handlePrimary = (e) => {
    // 주무기의 값이 바뀌는 경우
    setPrimary(e.target.value);
  };

  const handleSecond = (e) => {
    // 보조무기의 값이 바뀌는 경우
    setSecondary(e.target.value);
  };

  const getSelectedOptionNames = (isPrimary) => {
    // 선택한 무기의 이름을 가져오기 위한 함수
    if (isPrimary) {
      return primary.map((selectedId) => {
        const selectedOption = primaryList.find(
          (option) => option.id === selectedId
        );
        return selectedOption ? selectedOption.name : "";
      });
    } else {
      return secondary.map((selectedId) => {
        const selectedOption = secondList.find(
          (option) => option.id === selectedId
        );
        return selectedOption ? selectedOption.name : "";
      });
    }
  };

  const handleSubmit = async (e) => {
    // 폼을 제출할 경우 입력폼의 값을 기반으로 데이터를 DB로 POST
    e.preventDefault();

    const elements = e.target.elements;
    const formData = {
      from: elements.from.value,
      name: elements.name.value,
      squad: elements.squad.value,
      side: elements.side.value,
      weapon: [...primary, ...secondary],
      ability: elements.ability.value,
      description: elements.description.value,
    };

    await axios
      .post("http://localhost:4000/operator/insert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: formData,
      })
      .then(() => navigate("/operator"))
      .catch((e) => {
        console.error("Error: ", e);
      });
  };

  return (
    <Box
      component="form"
      className="operator-form"
      onSubmit={(e) => handleSubmit(e)}>
      <FormControl>
        <FormLabel>오퍼레이터 추가하기</FormLabel>
        <FormControl>
          <InputLabel htmlFor="from">국가</InputLabel>
          <OutlinedInput id="from" label="from" name="from" />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="name">이름</InputLabel>
          <OutlinedInput id="name" label="name" name="name" />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="squad">소속</InputLabel>
          <OutlinedInput id="squad" label="squad" name="squad" />
          {/* <FormHelperText id="squad">대문자로 입력하세요</FormHelperText> */}
        </FormControl>
        <FormControl>
          <FormLabel id="side">진영</FormLabel>
          <RadioGroup
            aria-labelledby="side"
            name="side"
            value={side}
            onChange={handleChange}>
            <FormControlLabel value="ATK" control={<Radio />} label="공격팀" />
            <FormControlLabel value="DEF" control={<Radio />} label="수비팀" />
          </RadioGroup>
        </FormControl>

        {/* 주무기 입력칸 */}
        <FormControl>
          <InputLabel htmlFor="primary">주무기 선택</InputLabel>
          <Select
            multiple
            value={primary}
            label="주무기 선택"
            labelId="primary"
            input={<OutlinedInput label="Tag" />}
            renderValue={() => getSelectedOptionNames(true).join(", ")}
            onChange={handlePrimary}>
            {primaryList.map((item) => (
              <MenuItem value={item.id}>
                <Checkbox checked={primary.indexOf(item.id) > -1} />
                <ListItemText primary={item.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* 보조무기 입력칸 */}
        <FormControl>
          <InputLabel htmlFor="secondary">보조무기 선택</InputLabel>
          <Select
            multiple
            value={secondary}
            label="보조무기 선택"
            labelId="secondary"
            input={<OutlinedInput label="Tag" />}
            renderValue={() => getSelectedOptionNames(false).join(", ")}
            onChange={handleSecond}>
            {secondList.map((item) => (
              <MenuItem value={item.id}>
                <Checkbox checked={secondary.indexOf(item.id) > -1} />
                <ListItemText primary={item.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl>
          <InputLabel htmlFor="ability">특수능력</InputLabel>
          <OutlinedInput id="ability" label="ability" name="ability" />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="description">특수능력 설명</InputLabel>
          <OutlinedInput
            id="description"
            label="description"
            name="description"
          />
        </FormControl>
        <Input type="submit" value="추가하기" />
      </FormControl>
    </Box>
  );
};

export default OperatorAdd;
