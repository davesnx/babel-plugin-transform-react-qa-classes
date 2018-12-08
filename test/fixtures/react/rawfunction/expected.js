import React, { Component } from 'react';

function SubComponent() {
  return <div data-qa="sub-component">Sub</div>;
}

const componentName = () => {
  return <div data-qa="component-name">
    <SubCoponent />
  </div>;
};

export default componentName;
