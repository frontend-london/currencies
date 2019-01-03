import React from 'react';
import { shallow } from 'enzyme';

import Instruments from './index';

it('renders without crashing', () => {
  shallow(<Instruments />);
});
