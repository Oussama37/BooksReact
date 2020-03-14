import React, { Component } from 'react';
import axios from 'axios'
import {Table,Button,Toast, ToastBody, ToastHeader,Label,Input,FormGroup,Modal,ModalHeader,ModalBody,ModalFooter} from 'reactstrap';

class  App extends Component {
  state = {
    valid:false,
    books:[] ,
    NewBookData:{
      TITLE :'',
      AUTHOR:'',
      EDITOR:'',
      DESCRIPTION:'',
      PRICE:''  
    },
   
    EditBookData:{
      id:'',
      TITLE :'',
      AUTHOR:'',
      EDITOR:'',
      DESCRIPTION:'',
      PRICE:''
    },
    NewBookModal:false,
    EditBookData:false,
    
  }
  componentWillMount(){
   this. _refreshBooks(); 

  } 
  toggleNewBookModal(){
    this.setState({
      NewBookModal:! this.state.NewBookModal
    })
  }
  
  toggleEditBookModal(){
    this.setState({
      EditBookModal:! this.state.EditBookModal
    })
  }
 addbook(){
    axios.post('http://localhost:1937/books',this.state.NewBookData).then(res =>{
      let{books}=this.state;
      books.push(res.data);

      this.setState({books , NewBookModal:false,NewBookData:{
        TITLE :'',
        AUTHOR:'',
        EDITOR:'',
        DESCRIPTION:'',
        PRICE:''  
      },
    });
      if(res.status===200){
          alert('ok')
      }
      
    })
    

  }
  updateBook(){
    let {TITLE,AUTHOR,EDITOR,DESCRIPTION,PRICE} = this.state.EditBookData;

    axios.put('http://localhost:1937/books/' + this.state.EditBookData._id,{
      TITLE,AUTHOR,EDITOR,DESCRIPTION,PRICE
    }).then((res) =>{
        this._refreshBooks();  
        
        this.setState({
          EditBookModal : false,EditBookData:{TITLE :'',
          AUTHOR:'',
          EDITOR:'',
          DESCRIPTION:'',
          PRICE:''}
        })
      });
  }
  
  EditBookData(_id,TITLE,AUTHOR,EDITOR,DESCRIPTION,PRICE){
    this.setState({
      EditBookData:{_id,TITLE,AUTHOR,EDITOR,DESCRIPTION,PRICE },EditBookModal:! this.state.EditBookModal
    });
      console.log(TITLE,AUTHOR,EDITOR,DESCRIPTION,PRICE)
  }

  DeleteBook(_id){
    if(window.confirm('Tap OK  if You want to Delete it ! ')){
      axios.delete('http://localhost:1937/books/'+_id)
      .then((res)=>{
        this._refreshBooks();
      });
    }
    
  }
  _refreshBooks(){
    axios.get('http://localhost:1937/books').then((res)=>{
       
       this.setState({
         books:res.data
       }) 
     });
  }
  render(){
    
    let books = this.state.books.map((book)=>{
      return(
        <tr key={book._id}>
            <td>{book.TITLE}</td>
            <td>{book.AUTHOR}</td>
            <td>{book.EDITOR}</td>
            <td>{book.DESCRIPTION}</td>
            <td>{book.PRICE}</td>
            <td>
              <Button color="success" size="sm" className="mr-2" onClick={this.EditBookData.bind(this,book._id,book.TITLE,book.AUTHOR,book.EDITOR,book.DESCRIPTION,book.PRICE )}>Edit</Button>
              <Button color="danger" size="sm" onClick ={this.DeleteBook.bind(this,book._id)} >Delete</Button>
            </td>
        </tr>
      )
    });
    return (
    <div className="App comtainer">
      <h1>Books Manage</h1>
      <Button  className="my-4" color="primary" onClick={this.toggleNewBookModal.bind(this)}>Add a New Book</Button>
      <Modal isOpen={this.state.NewBookModal} toggle={this.toggleNewBookModal.bind(this)} >
        <ModalHeader toggle={this.toggleNewBookModal.bind(this)}>Add a Book</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="Title">Title</Label>
            <Input type="text" name="title" id="Title" placeholder="Book's Title" value={this.state.NewBookData.TITLE} onChange={(e)=>{
              let {NewBookData}=this.state;
              NewBookData.TITLE=e.target.value;
              this.setState({NewBookData})
            }} />
          </FormGroup>

          <FormGroup>
            <Label for="Author">Author</Label>
            <Input type="text" name="Author" id="Author" placeholder="Book's Author" value={this.state.NewBookData.AUTHOR} onChange={(e)=>{
              let {NewBookData}=this.state;
              NewBookData.AUTHOR=e.target.value;
              this.setState({NewBookData})
            }} />
          </FormGroup>

          <FormGroup>
            <Label for="Editor">Editor</Label>
            <Input type="text" name="Editor" id="Editor" placeholder="Book's Editor" value={this.state.NewBookData.EDITOR} onChange={(e)=>{
              let {NewBookData}=this.state;
              NewBookData.EDITOR=e.target.value;
              this.setState({NewBookData})
            }} />
          </FormGroup>

          <FormGroup>
            <Label for="Descripton">Descripton</Label>
            <Input type="text" name="Descripton" id="Descripton" placeholder="Book's Descripton" value={this.state.NewBookData.DESCRIPTION} onChange={(e)=>{
              let {NewBookData}=this.state;
              NewBookData.DESCRIPTION=e.target.value;
              this.setState({NewBookData})
            }}/>
          </FormGroup>

          <FormGroup>
            <Label for="Price">Price</Label>
            <Input type="text" name="Price" id="Price" placeholder="Book's Price" value={this.state.NewBookData.PRICE} onChange={(e)=>{
              let {NewBookData}=this.state;
              NewBookData.PRICE=e.target.value;
              this.setState({NewBookData})
            }} />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.addbook.bind(this)}>Add</Button>{' '}
          <Button color="secondary" onClick={this.toggleNewBookModal.bind(this)}>Cancel</Button>
        </ModalFooter>
      </Modal>
            
      <Modal isOpen={this.state.EditBookModal} toggle={this.toggleEditBookModal.bind(this)} >
        <ModalHeader toggle={this.toggleEditBookModal.bind(this)}>Edit a Book</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="Title">Title</Label>
            <Input type="text" name="title" id="Title" placeholder="Book's Title" value={this.state.EditBookData.TITLE} onChange={(e)=>{
              let {EditBookData}=this.state;
              EditBookData.TITLE=e.target.value;
              this.setState({EditBookData})
            }} />
          </FormGroup>

          <FormGroup>
            <Label for="Author">Author</Label>
            <Input type="text" name="Author" id="Author" placeholder="Book's Author" value={this.state.EditBookData.AUTHOR} onChange={(e)=>{
              let {EditBookData}=this.state;
              EditBookData.AUTHOR=e.target.value;
              this.setState({EditBookData})
            }} />
          </FormGroup>

          <FormGroup>
            <Label for="Editor">Editor</Label>
            <Input type="text" name="Editor" id="Editor" placeholder="Book's Editor" value={this.state.EditBookData.EDITOR} onChange={(e)=>{
              let {EditBookData}=this.state;
              EditBookData.EDITOR=e.target.value;
              this.setState({EditBookData})
            }} />
          </FormGroup>

          <FormGroup>
            <Label for="Descripton">Descripton</Label>
            <Input type="text" name="Descripton" id="Descripton" placeholder="Book's Descripton" value={this.state.EditBookData.DESCRIPTION} onChange={(e)=>{
              let {EditBookData}=this.state;
              EditBookData.DESCRIPTION=e.target.value;
              this.setState({EditBookData})
            }}/>
          </FormGroup>

          <FormGroup>
            <Label for="Price">Price</Label>
            <Input type="text" name="Price" id="Price" placeholder="Book's Price" value={this.state.EditBookData.PRICE} onChange={(e)=>{
              let {EditBookData}=this.state;
              EditBookData.PRICE=e.target.value;
              this.setState({EditBookData})
            }} />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.updateBook.bind(this)}>Add</Button>{' '}
          <Button color="secondary" onClick={this.toggleEditBookModal.bind(this)}>Cancel</Button>
        </ModalFooter>
      </Modal>

      <Table>
        <thead>
          <tr>
            <th>Title </th>
            <th>Author</th>
            <th>Editor</th>
            <th>Descripton</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>      
          {books}
        </tbody>
      </Table>
    </div>
    
  );
  
}}

export default App;
