import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FormControl,
  InputLabel,
  Input,
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

const OperatorUpdate = (data) => {
  // update 폼 구성
  // 정보의 수정만 할 뿐 Add와 거의 동일
  const id = useParams().id;
  const [operator, setOperator] = useState([]);
  const [load, setLoad] = useState(false);
  const [primaryList, setPrimaryList] = useState([]);
  const [secondList, setSecondList] = useState([]);
  const [primary, setPrimary] = useState([]);
  const [secondary, setSecondary] = useState([]);
  const navigate = useNavigate();

  const fetch = () => {
    // Add와 동일하지만 해당 오퍼레이터의 정보를 가져와 입력폼을 구성
    // 수정폼의 경우 해당 정보로 입력칸이 미리 채워져 있도록 함
    axios
      .get(`http://localhost:4000/operator/${id}`)
      .then((response) => {
        setOperator(response.data);
        response.data.weapon.map((item) => {
          if (item.primary === true) {
            setPrimary((prevArray) => [...prevArray, item._id]);
          } else {
            setSecondary((prevArray) => [...prevArray, item._id]);
          }
        });
        setLoad(true);
      })
      .catch((e) => console.error("Error: ", e));

    axios
      .get(`http://localhost:4000/weapon/all`)
      .then((response) => {
        response.data.map((item) => {
          const newItem = { name: item.name, id: item._id };
          if (item.primary === true) {
            setPrimaryList((prevArray) => [...prevArray, newItem]);
          } else {
            setSecondList((prevArray) => [...prevArray, newItem]);
          }
        });
      })
      .catch((e) => console.error("Error: ", e));
  };

  useEffect(() => {
    fetch();
  }, []);

  const handlePrimary = (e) => {
    setPrimary(e.target.value);
  };

  const handleSecond = (e) => {
    setSecondary(e.target.value);
  };

  const getSelectedOptionNames = (isPrimary) => {
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

  const handleSubmit = (e) => {
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

    axios
      .put(`http://localhost:4000/operator/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: formData,
      })
      .then(() => navigate(`/operator/${id}`))
      .catch((e) => console.error("Error: ", e));
  };

  return (
    <Box
      component="form"
      className="operator-form"
      onSubmit={(e) => handleSubmit(e)}>
      {operator !== null ? (
        load === true ? (
          <FormControl>
            <FormLabel>오퍼레이터 수정하기</FormLabel>
            <FormControl>
              <InputLabel htmlFor="from">국가</InputLabel>
              <OutlinedInput
                id="from"
                label="from"
                name="from"
                defaultValue={operator.from}
              />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="name">이름</InputLabel>
              <OutlinedInput
                id="name"
                label="name"
                name="name"
                defaultValue={operator.name}
              />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="squad">소속</InputLabel>
              <OutlinedInput
                id="squad"
                label="squad"
                name="squad"
                defaultValue={operator.squad}
              />
            </FormControl>
            <FormControl>
              <FormLabel id="side">진영</FormLabel>
              <RadioGroup
                aria-labelledby="side"
                name="side"
                defaultValue={operator.side}>
                <FormControlLabel
                  value="ATK"
                  control={<Radio />}
                  label="공격팀"
                />
                <FormControlLabel
                  value="DEF"
                  control={<Radio />}
                  label="수비팀"
                />
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
              <OutlinedInput
                id="ability"
                label="ability"
                name="ability"
                defaultValue={operator.ability}
              />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="description">특수능력 설명</InputLabel>
              <OutlinedInput
                id="description"
                label="description"
                name="description"
                defaultValue={operator.description}
              />
            </FormControl>
            <Input type="submit" value="수정하기" />
          </FormControl>
        ) : (
          <div>Loading...</div>
        )
      ) : (
        <div>NULL</div>
      )}
    </Box>
  );
};

export default OperatorUpdate;
