import React, { useMemo, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';

// components
import Box from '@material-ui/core/Box';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';

// redux
import * as AppActions from '../redux/actions/app-action';
import { IStore } from '../redux/stores/configure-store';
import { useDispatch, useSelector } from 'react-redux';

interface Props {
  selectedColors: number[];
  selectedSizes: number[];
  selectedCategories: number[];
  handleChangeColors: any;
  handleChangeSizes: any;
  handleChangeCategories: any;
}

const CategoryForm: React.FC<Props> = (props) => {
  const {
    selectedColors,
    selectedSizes,
    selectedCategories,
    handleChangeCategories,
    handleChangeColors,
    handleChangeSizes,
  } = props;

  const classes = useStyles();

  const colors = useSelector((store: IStore) => store.appState.colors);
  const sizes = useSelector((store: IStore) => store.appState.sizes);
  const categories = useSelector((store: IStore) => store.appState.categories);

  const getColorName = useCallback(
    (id: number) => {
      const color = colors.find((x) => x.id === id);
      if (!color) return '';
      return color.name;
    },
    [colors],
  );

  const getSizeName = useCallback(
    (id: number) => {
      const size = sizes.find((x) => x.id === id);
      if (!size) return '';
      return size.name;
    },
    [sizes],
  );

  const getCategoryName = useCallback(
    (id: number) => {
      const category = categories.find((x) => x.id === id);
      if (!category) return '';
      return category.name;
    },
    [categories],
  );

  const colorsMap = useMemo(
    () =>
      colors.map((color, index) => {
        const checked = selectedColors.findIndex((x) => x === color.id) > -1;
        return (
          <MenuItem key={index} value={color.id}>
            <Checkbox checked={checked} />
            <ListItemText primary={color.code} />
          </MenuItem>
        );
      }),
    [colors, selectedColors],
  );

  const sizesMap = useMemo(
    () =>
      sizes.map((size, index) => {
        const checked = selectedSizes.findIndex((x) => x === size.id) > -1;
        return (
          <MenuItem key={index} value={size.id}>
            <Checkbox checked={checked} />
            <ListItemText primary={size.name} />
          </MenuItem>
        );
      }),
    [sizes, selectedSizes],
  );

  const categoriesMap = useMemo(
    () =>
      categories.map((category, index) => {
        const checked = selectedCategories.findIndex((x) => x === category.id) > -1;
        return (
          <MenuItem key={index} value={category.id}>
            <Checkbox checked={checked} />
            <ListItemText primary={category.name} />
          </MenuItem>
        );
      }),
    [categories, selectedCategories],
  );

  return (
    <Box>
      <FormControl className={classes.formControl}>
        <InputLabel id="check_color">Màu sắc</InputLabel>
        <Select
          labelId="check_color"
          multiple
          value={selectedColors}
          onChange={handleChangeColors}
          input={<Input />}
          renderValue={(selected) => (selected as number[]).map((x) => getColorName(x)).join(', ')}
        >
          {colorsMap}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="check_size">Kích thước</InputLabel>
        <Select
          labelId="check_size"
          multiple
          value={selectedSizes}
          onChange={handleChangeSizes}
          input={<Input />}
          renderValue={(selected) => (selected as number[]).map((x) => getSizeName(x)).join(', ')}
        >
          {sizesMap}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="check_category">Thể loại</InputLabel>
        <Select
          labelId="check_category"
          multiple
          value={selectedCategories}
          onChange={handleChangeCategories}
          input={<Input />}
          renderValue={(selected) =>
            (selected as number[]).map((x) => getCategoryName(x)).join(', ')
          }
        >
          {categoriesMap}
        </Select>
      </FormControl>
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
}));

export default CategoryForm;
