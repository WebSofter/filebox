import React from 'react';
import Typography from '@material-ui/core/Typography';
import DSignForm from '../components/DSignForm';

function Profile() {
    return <div>
            <h2>Профиль</h2>
            <Typography paragraph></Typography>
            <DSignForm/>
          </div>;
}

export default Profile;