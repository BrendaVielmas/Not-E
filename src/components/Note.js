
import React, {Component} from 'react';
import { deleteNote } from './NotesLogic';
import { Link } from 'react-router-dom';

class Note extends Component {
	constructor (props) {
		super (props)
	 	this.state = {
	 		title: props.title,
			message: props.message
		}
		this.delete = this.delete.bind(this);
	}
	delete() {
        deleteNote(this.props.noteId)
    }
	render () {
		return (
			<section className="noteContainer">
				<section className="btnsEditAndDelete">
					<Link className="editBtn" to={{
					pathname: `${this.props.dashboardPath}/${this.props.noteId}/edit`,
					state: {
						title: this.state.title,
						message: this.state.message,
						noteId: this.props.noteId
					}
					}}><img src={require("./images/edit.png")}/></Link>
					<button className="deleteBtn" onClick={this.delete}><img src={require("./images/close.png")}/></button>
				</section>
				
				<section className="noteBody">	
					<p className="titleNote">{this.state.title}</p>
					<p className="messageNote">{this.state.message}</p>
				</section>
				
				
			</section>
		)
	}
}
export default Note;