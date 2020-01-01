import React, { Component } from 'react';

import PropTypes from 'prop-types';

import validate from 'validate.js';

import { withStyles } from '@material-ui/core/styles';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {DropzoneArea} from 'material-ui-dropzone'
import {TextareaAutosize, Typography} from "@material-ui/core";
import postManager from "../../services/postManager";

const styles = (theme) => ({
    icon: {
        marginRight: theme.spacing(0.5)
    },

    divider: {
        margin: 'auto'
    },

    grid: {
        marginBottom: theme.spacing(2)
    },

});

const initialState = {
    performingAction: false,

    objFile: [],
    descriptionBox: '',
    errors: null
};

// TODO: Add 'performing action' states and handlers
class PostCreateDialog extends React.Component{
    constructor(props){
        super(props);
        this.state = initialState;

        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleDropzoneChange = this.handleDropzoneChange.bind(this);
        this.handlePostClick = this.handlePostClick.bind(this);
    }
    handleDropzoneChange(files){
        this.setState({
            objFile:files[0]
        });
    }
    handleDescriptionChange({target}){
        this.setState({
            [target.name]: target.value
        });
    }
    handlePostClick(){
        postManager.post(this.state.objFile, this.state.description);
        this.props.dialogProps.onClose();
    }
    render() {
        // Styling
        const {classes} = this.props;

        // Dialog Properties
        const {dialogProps} = this.props;

        const {
            performingAction,

            objFile,
            descriptionBox,

            errors
        } = this.state;

        return (
            <Dialog {...dialogProps}>
                <DialogTitle>
                    <Typography>
                        Create Post
                    </Typography>
                </DialogTitle>

                <DialogContent>
                    <Hidden smDown>
                        <Grid container direction={'column'}>
                            <Grid item>
                                <DropzoneArea
                                    filesLimit={1}
                                    onChange={this.handleDropzoneChange}
                                />
                            </Grid>
                            <Grid container direction={'row'}>
                                <Grid item xs={6}>
                                    <TextareaAutosize
                                        maxLength={200}
                                        rows={4}
                                        placeholder={'Description'}
                                        value={this.descriptionBox}
                                        onChange={ this.handleDescriptionChange }
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Button color={'secondary'} variant={'contained'} disabled={performingAction} onClick={this.handlePostClick}>
                                        Post
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Hidden>
                </DialogContent>

            </Dialog>

        );
    }
}

PostCreateDialog.propTypes = {
    // Styling
    classes: PropTypes.object.isRequired,

    // Dialog Properties
    dialogProps: PropTypes.object.isRequired,

    // Custom Properties
    user: PropTypes.object.isRequired,
    userData: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,

    // Custom Functions
    openSnackbar: PropTypes.func.isRequired,
};

export default withStyles(styles)(PostCreateDialog);