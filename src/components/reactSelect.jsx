/* eslint-disable no-unused-vars */
import React from 'react';
import { components } from 'react-select';

export const DropdownIcon = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <i
        className={`fas fa-fw fa-caret-${
          props.selectProps.menuIsOpen == false ? 'down' : 'up'
        }`}
      />
    </components.DropdownIndicator>
  );
};

export const DropdownIndicator = (props) => {
  const { selectProps } = props;
  return (
    <components.DropdownIndicator {...props}>
      <i
        className={`fas fa-fw fa-chevron-${
          props.selectProps.menuIsOpen == false ? 'down' : 'up'
        }`}
      />
    </components.DropdownIndicator>
  );
};

export const ReactSelectStyles = {
  indicatorSeparator: () => null,
  control: (provided, state) => ({
    ...provided,
    minHeight: 'calc(1.5em + 0.75rem + 7px)',
    border: 'none',
    borderBottom: '1px solid #d6d6d6',
    fontSize: 16,
    borderRadius: 0,
    boxShadow: 'none !important',
    textAlign: 'left',
    '>div': {
      paddingLeft: 12,
      fontSize: 16,
      '>div': {
        marginLeft: 0,
      },
    },
    '&:active': {
      border: 'none',
    },
  }),
  menu: (provided, state) => ({
    ...provided,
    textAlign: 'left',
  }),
  menuList: (provided, state) => ({
    ...provided,
  }),
  placeholder: (base) => ({
    ...base,
    color: '#000000',
    opacity: '0.6',
  }),
};

export const ReactSelectNewPaymentStyles = {
  indicatorSeparator: () => null,
  control: (provided, state) => ({
    ...provided,
    minHeight: 'calc(1.5em + 0.75rem + 7px)',
    border: 'none',
    border: '1px solid #d6d6d6',
    borderRadius: '4px',
    padding: '0 5px',
    fontSize: 16,
    boxShadow: '0 !important',
    '>div': {
      paddingLeft: 5,
      fontSize: 16,
      '>div': {
        marginLeft: 0,
      },
    },
    '&:active': {
      border: 'none',
    },
  }),
  menu: (provided, state) => ({
    ...provided,
    position: 'relative',
  }),
  menuList: (provided, state) => ({
    ...provided,
  }),
  placeholder: (base) => ({
    ...base,
    color: '#000000',
    opacity: '0.6',
  }),
};
export const ReactSelectGrubStyles = {
  indicatorSeparator: () => null,
  control: (provided, state) => ({
    ...provided,
    borderRadius: 0,
    boxShadow: 'none !important',
    padding: '4px',
  }),
  menu: (provided, state) => ({
    ...provided,
    // border: '1px solid red',
  }),
  menuList: (provided, state) => ({
    ...provided,
  }),
};

export const HeroPageStyles = {
  indicatorSeparator: () => null,
  control: (provided, state) => ({
    ...provided,
    borderRadius: '8px',
    border: 'none',
    boxShadow: 'none !important',
    padding: '4px',
  }),
  menu: (provided, state) => ({
    ...provided,
    // border: '1px solid red',
  }),
  menuList: (provided, state) => ({
    ...provided,
  }),
};

export const GrowthHackStyles = {
  indicatorSeparator: () => null,
  control: (provided, state) => ({
    ...provided,
    borderRadius: 0,
    boxShadow: 'none !important',
    padding: '6px',
  }),
  menu: (provided, state) => ({
    ...provided,
    // border: '1px solid red',
  }),
  menuList: (provided, state) => ({
    ...provided,
  }),
};
export const ReactSelectCalcStyles = {
  indicatorSeparator: () => null,
  control: (provided, state) => ({
    ...provided,
    borderRadius: 0,
    minHeight: 'calc(1.5em + 0.75rem + 7px)',
    boxShadow: '0 !important',
    padding: '4px',
  }),
  menu: (provided, state) => ({
    ...provided,
    // border: '1px solid red',
  }),
  menuList: (provided, state) => ({
    ...provided,
  }),
};
export const paymentSelectStylesMob = {
  indicatorSeparator: () => null,
  control: (provided, state) => ({
    ...provided,
    borderRadius: 0,
    backgroundColor: '#fafafa',
    boxShadow: '0 !important',
    padding: '4px',
    border: 0,
    height: 45,
    justifyContent: 'center',
    border: '0.5px solid #bdbdbd',
  }),
  menu: (provided, state) => ({
    ...provided,
    // border: '1px solid red',
  }),
  menuList: (provided, state) => ({
    ...provided,
  }),
  valueContainer: (base) => ({
    ...base,
    justifyContent: 'center',
  }),
};
export const paymentSelectStyles = {
  indicatorSeparator: () => null,
  control: (provided, state) => ({
    ...provided,
    borderRadius: 0,
    backgroundColor: '#fafafa',
    boxShadow: '0 !important',
    padding: '4px',
    justifyContent: 'center',
    border: '0.5px solid #bdbdbd',
  }),
  menu: (provided, state) => ({
    ...provided,
    // border: '1px solid red',
  }),
  menuList: (provided, state) => ({
    ...provided,
  }),
};
export const ReactSelectPartnerStyles = {
  indicatorSeparator: () => null,
  control: (provided, state) => ({
    ...provided,
    minHeight: 'calc(1.5em + 0.75rem + 7px)',
    border: 'none',
    backgroundColor: 'transparent',
    borderBottom: '2px solid #999999',
    opacity: '1',
    marginBottom: '10px',
    paddingTop: '0px',
    paddingBottom: '5px',
    marginTop: '30px',
    fontSize: 16,
    borderRadius: 0,
    boxShadow: '0 !important',
    '>div': {
      paddingLeft: 5,
      fontSize: 16,
      '>div': {
        marginLeft: 0,
      },
    },
    '&:active': {
      border: 'none',
    },
  }),
  menu: (provided, state) => ({
    ...provided,
    // border: '1px solid red',
  }),
  menuList: (provided, state) => ({
    ...provided,
    color: 'black',
  }),
  placeholder: (base) => ({
    ...base,
    color: '#000000',
    opacity: '0.6',
  }),
};
export const interimFormSelectStyle = {
  control: (provided) => ({
    ...provided,
    borderTop: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    borderRadius: 0,
    height: '45px',
    boxShadow: 'none',
  }),
};
export const ComplianceSelectStyles = {
  indicatorSeparator: () => null,
  control: (provided, state) => ({
    ...provided,
    minHeight: 'calc(1.5em + 0.75rem + 7px)',
    border: 'none',
    borderBottom: '1px solid #d6d6d6',
    fontSize: 16,
    borderRadius: '6px 6px 0 0 ',
    boxShadow: '0 !important',
    '>div': {
      paddingLeft: 5,
      fontSize: 16,
      '>div': {
        marginLeft: '2px',
      },
    },
    '&:active': {
      border: 'none',
    },
  }),
  menu: (provided, state) => ({
    ...provided,
    // border: '1px solid red',
  }),
  menuList: (provided, state) => ({
    ...provided,
  }),
  placeholder: (base) => ({
    ...base,
    color: '#000000',
    opacity: '0.6',
  }),
};
export const RequestCallBackSelectStyles = {
  indicatorSeparator: () => null,
  control: (provided, state) => ({
    ...provided,
    minHeight: 'calc(1.5em + 0.75rem + 7px)',
    border: 'none',
    borderBottom: '1px solid #d6d6d6',
    fontSize: 16,
    width: '100%',
    height: 50,
    // borderRadius: 4,
    boxShadow: '0 !important',
    '>div': {
      paddingLeft: 5,
      fontSize: 16,
      textAlign: 'left',
      '>div': {
        // marginLeft: '-2px',
        textAlign: 'left',
      },
    },
    '&:active': {
      border: 'none',
    },
  }),
  menu: (provided, state) => ({
    ...provided,
    // border: '1px solid red',
  }),
  menuList: (provided, state) => ({
    ...provided,
  }),
  placeholder: (base) => ({
    ...base,
    color: '#808080',
    // opacity: '0.6',
    fontSize: '16px',
  }),
};

export const ServiceRevampSelectStyle = {
  indicatorSeparator: () => null,
  control: (provided, state) => ({
    ...provided,
    border: '2px solid #EBEBEB',
    fontSize: 16,
    width: '100%',
    padding: '6px 10px',
    borderRadius: '8px',
    '>div': {
      paddingLeft: 5,
      fontSize: 16,
      '>div': {
        // marginLeft: '-2px',
      },
    },
    '&:active': {
      border: 'none',
    },
  }),
};

export const OneLineFormReactSelectStyles = {
  indicatorSeparator: () => null,
  control: (provided, state) => ({
    ...provided,
    minHeight: 'calc(1.5em + 0.75rem + 7px)',
    border: 'none',
    borderBottom: '1px solid #d6d6d6',
    fontSize: 16,
    borderRadius: 0,
    boxShadow: '0 !important',
    '>div': {
      paddingLeft: 12,
      paddingRight: 12,
      fontSize: 16,
      padding: '6px 5px',
      '>div': {
        // marginLeft: 0,
      },
    },
    '&:active': {
      border: 'none',
    },
  }),
  menu: (provided, state) => ({
    ...provided,
    // border: '1px solid red',
  }),
  menuList: (provided, state) => ({
    ...provided,
    textAlign: 'left',
  }),
  placeholder: (base) => ({
    ...base,
    color: '#000000',
    opacity: '0.6',
  }),
};

export const ReactExptSelectStyles = {
  indicatorSeparator: () => null,
  control: (provided, state) => ({
    ...provided,
    minHeight: 'calc(1.5em + 0.75rem + 7px)',
    border: 'none',
    fontSize: 16,
    boxShadow: '0 !important',
    backgroundColor: '#F0F1F3',
    height: '49px',
    borderRadius: '8px',
    '>div': {
      paddingLeft: 12,
      paddingRight: 12,
      fontSize: 16,
      '>div': {
        marginLeft: 0,
      },
    },
    '&:active': {
      border: 'none',
    },
  }),
  menu: (provided, state) => ({
    ...provided,
    // border: '1px solid red',
  }),
  menuList: (provided, state) => ({
    ...provided,
  }),
  placeholder: (base) => ({
    ...base,
    whiteSpace: "nowrap",
    color: '#606162',
    opacity: '0.6',
  }),
};

export const CalculatorTdsSelectStyles = {
  indicatorSeparator: () => null,
  control: (provided, state) => ({
    ...provided,
    borderRadius: 0,
    backgroundColor: '#fff',
    boxShadow: '0 !important',
    padding: '4px',
    height: '52px',
    justifyContent: 'center',
    border: '1px solid #CACED1',
    '>div': {
      paddingRight: 0,
      fontWeight: 700,
      fontSize: 18,
      color: '#231F20',
      marginTop: -10,
      '>div': {
        marginLeft: 0,
      },
    },
  }),
  menu: (provided, state) => ({
    ...provided,
    // border: '1px solid red',
  }),
  menuList: (provided, state) => ({
    ...provided,
    fontSize: 18,
    fontWeight: 400,
    fontSize: 14,
    color: '#000000',
  }),
};