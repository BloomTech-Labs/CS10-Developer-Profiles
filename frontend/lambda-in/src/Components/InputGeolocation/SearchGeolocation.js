import React from 'react';
import InputGeolocation from './InputGeolocation';

const SearchGeolocation = () => {
  /**
   * The following are no required
   * DO NOT PASS `value` => Is not neccesary,
   * Will break this.setState() functionality in InputGeolocation component.
   *
   * value: this.state.fieldValue
   */
  const textFieldProps = {
    id: 'sampleTextField',
    label: 'Desired Locations',
    fullWidth: true,
    margin: 'normal',
    className: 'textField-class--name another-class--name',
    style: {},
    variant: 'outlined',
  };
  const listItemProps = {
    className: 'list-suggestion--options',
    style: {},
  };
  return (
    <div style={{ margin: '30px' }}>
      <h1>
        <strong>RAW COMPONENT</strong>
      </h1>
      <br />
      <br />
      <br />
      <InputGeolocation />
      <hr />
      <h1>
        <strong>CUSTOMIZED COMPONENT</strong>
      </h1>
      <InputGeolocation
        textFieldProps={textFieldProps}
        listItemProps={listItemProps}
      />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <hr />
      <h1>
        <strong>SOME OTHER HTML ELEMENTS</strong>
        <br />
        <br />
        <br />
        <hr />
      </h1>
      <p>
        Spicy jalapeno bacon ipsum dolor amet in pancetta swine, culpa in veniam
        frankfurter. Pork chop tempor t-bone, irure nulla filet mignon pork loin
        cupidatat ut jerky venison et aliquip. Officia veniam swine brisket est
        leberkas shoulder sausage aliquip proident culpa aute reprehenderit
        doner consectetur. Capicola biltong doner commodo t-bone, landjaeger
        lorem officia. Adipisicing chuck officia jowl exercitation tempor
        laboris et pork picanha magna anim.
      </p>
      <p>
        Short ribs tempor pancetta minim duis dolore consequat dolore jowl. Sed
        nulla boudin, elit in officia adipisicing eiusmod pastrami. Shoulder
        salami est pork belly aliqua. Aliquip anim turkey meatball velit
        tenderloin enim nulla bresaola aliqua rump eu.
      </p>
      <p>
        Sed adipisicing id, eiusmod magna consectetur kevin brisket. Tri-tip
        anim elit eiusmod swine ut bresaola excepteur chuck lorem salami ham
        hock. Laboris ea swine veniam beef ut turducken in shoulder anim tri-tip
        kielbasa turkey eiusmod. Nulla minim shoulder, adipisicing pariatur nisi
        in. Voluptate sausage irure kevin aliquip biltong. Anim aliquip chicken
        ipsum aute. Ipsum minim elit fugiat consequat jowl anim deserunt duis
        meatloaf dolor pig filet mignon chicken cupidatat.
      </p>
    </div>
  );
};

export default SearchGeolocation;
