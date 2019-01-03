import React from 'react';
import { shallow } from 'enzyme';

import InstrumentsRow from './row';

it('renders without crashing', () => {
    const props = {
        currency: 'EUR'
    };
    shallow(<InstrumentsRow {...props} />);
});
