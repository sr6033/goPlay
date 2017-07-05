import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';


const AddGameForm = ({
  onSubmit,
  onChange,
  errors,
  game,
}) => (
  <Card className="container">
    <form action="/" onSubmit={onSubmit}>
      <h2 className="card-heading">Add new Game post</h2>

      {errors.summary && <p className="error-message">{errors.summary}</p>}

      <div className="field-line">
        <TextField
          floatingLabelText="Game"
          name="title"
          errorText={errors.title}
          onChange={onChange}
          value={game.title}
        />
      </div>

      <div className="field-line">
        <TextField
          floatingLabelText="Place"
          name="place"
          errorText={errors.place}
          onChange={onChange}
          value={game.place}
        />
      </div>

      <div className="field-line">
        <TextField
          floatingLabelText="Total minimum players"
          name="min_player"
          errorText={errors.min_player}
          onChange={onChange}
          value={game.min_player}
        />
      </div>

      <div className="field-line">
        <TextField
          floatingLabelText="Contact info"
          name="contact"
          errorText={errors.contact}
          onChange={onChange}
          value={game.contact}
        />
      </div>

      <div className="field-line">
        <TextField
          floatingLabelText="Description"
          name="description"
          errorText={errors.description}
          onChange={onChange}
          value={game.description}
        />
      </div>

      <div className="field-line">
        <TextField
          floatingLabelText="Image Url"
          name="image"
          errorText={errors.image}
          onChange={onChange}
          value={game.image}
        />
      </div>

      <div className="button-line">
        <RaisedButton type="submit" label="Add Game in current time" primary />
      </div>

    </form>
  </Card>
);

AddGameForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  game: PropTypes.object.isRequired
};

export default AddGameForm;