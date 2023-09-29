import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {CardGroup, Container, Nav, Navbar} from 'react-bootstrap';
import bg from './img/bg.png';
import { useEffect, useState } from 'react';
import data from './data';
import {Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom';
import Detail from './routes/detail';
import axios from 'axios';
import Cart from './routes/Cart';

function App() {
  // 상품 데이터 넣기 - 많은 데이터는 따로 data.js 에 저장해서 불러오는 방식으로
  // use~ => 훅 (유용한 것들 들어있는 함수같은거)
  let [shoes, setShoes] = useState(data);

  let navigate = useNavigate();  // 페이지 이동 도와줌
  let [num, setNum] = useState(0); // 버튼 클릭 횟수
  let [load, setLoad] = useState(false); /// 로딩중 문구

  let [재고] = useState([10, 11, 12]); 



  return (
    <div className="App">
       <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="#home">Shop</Navbar.Brand>
          <Nav className="me-auto">
            {/* 페이지 이동 버튼 */}
            {/* <Link to="/">홈</Link>
            <Link to="/detail">상세페이지</Link> */}
            <Nav.Link onClick={() => {navigate('/')}}>Home</Nav.Link>
            {/* navigate(-1)은 뒤로가기 1은 앞으로 가기 */}
            <Nav.Link onClick={() => {navigate('/detail')}}> Detail</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {/* 라우트는 페이지! 각 페이지도 컴포넌트로 만들면 좋음*/}
      <Routes>
          <Route path='/' element={<div>
            <> 
                  {/* html에서 이미지 넣을 때 */}
            <div className='main-bg' style={{backgroundImage : 'url(' + bg + ')'}}></div>
            <div className="container">
              <div className="row">
                {/* <div className="col-md-4"> */}
                  {/* 수백개 이미지 넣을 때 - public 폴더 이용 이미지 넣기 */}
                  {/* <img src="/logo192.png" width="80%"/> */}
                  {/* 아래가 이미지 넣는 권장 방식 - codingapple.com/어쩌구/ 경로에 배포시 */}
                  {/* <img src={process.env.PUBLIC_URL + '/logo192.png'} width="80%"/> */}
                  {/* <img src="https://codingapple1.github.io/shop/shoes1.jpg"  width="80%"/>
                  <h4>{shoes[0].title}</h4>
                  <p>{shoes[0].price}</p>
                </div> */}
                
      {/*  <Card 쓸 때마다 살짝 다른 내용 보여주고 싶으면 props 잘쓰면 댐*/}
            {/* <Card shoes = {shoes[0]} i = {1}/>
            <Card shoes = {shoes[1]} i = {2}/>
            <Card shoes = {shoes[2]} i = {3}/> */}
            {
              shoes.map((a, i) => {
                return(
                  <Card shoes = {shoes[i]} i ={i}/>
                )
              })
            }
              </div>
            </div>
            {/* 버튼을 누르면 서버에서 상품데이터 3개를 가져와서 메인페이지에 상품카드 3개를 더 생성 */}
            {/* -> 원래 데이터인 shoes에 결과.data 더해야됨 */}
            <button onClick={() => {
              setLoad(true);
                axios.get('https://codingapple1.github.io/shop/data2.json')
                .then((결과) => {
                  // console.log(결과.data) // 얘가 서버에서 가져온 데이터
                  // console.log(shoes)
                  let arr = [...shoes, ...결과.data];
                  // 이렇게 하면 배열괄호([]겉에꺼 띈 형태로 남음 {},{},{},{},{},{} 형태로)
                  setShoes(arr);
                  setNum(num+1);
                  setLoad(false);
                }).catch(() => {
                  console.log('실패함ㅅㄱ'); // 위 url 이상하게 적으면 나옴
                  setLoad(false);
                })

              // 응용1. 버튼을 2번 누르면 7,8,9번 상품을 가져와서 html로 보여주려면?
              if(num == 1){
                axios.get('https://codingapple1.github.io/shop/data3.json')
                .then((결과2) => {
                  let arr2 = [...shoes, ...결과2.data];
                  setShoes(arr2);
                }).catch(() => {
                  console.log('실패했어용')
                })
              }

              // 응용2. 버튼을 3번 누르면 더 상품이 없다고 안내문을 띄우려면?
              // 아니면 버튼을 숨기거나 그래도 되겠군요.
              if(num == 2){
                alert('상품이 없습니다.');
                document.querySelector('button').style.display = 'none';
              }

              // 응용3. 버튼을 누른 직후엔 "로딩중입니다" 이런 글자를 주변에 띄우고 싶으면?



              

              //   서버로 데이터 보내는 post 방식
              // axios.post('/sdasdf', {name: 'kim'})

              // // 동시에 ajax 요청 여러개하려면
              // Promise.all([axios.get('/url1'), axios.get('/url2')])
              // .then(()=>{
              // })

              // // fetch로도 get,post요청 가능한데 axios가 더편리
              // fetch('https://codingapple1.github.io/shop/data2.json')

            }}>더보기</button>
            </>
          </div>}/>
          {/*  URL 파라미터(/:id)로 상세페이지 100개 만들기 */}
          <Route path='/detail/:id' element= {
               <Detail shoes = {shoes} />
          }/>

          <Route path='/cart' element = {<Cart/>}/>


          {/* 404페이지 */} {/* *은 이외 모든 것 */}
          <Route path='*' element= {<div>없는 페이지에요</div>}/> 

          {/* Nested Routes - 아래 코드와 동일 */}
            {/* <Route path='/about/member' element = {<About/>}/>
          <Route path='/about/location' element = {<About/>}/> */} 

          {/* 언제씀 ? 여러 유사한 페이지 필요할 때 / 동적인 ui */}
         <Route path='/about' element = {<About/>}>
             <Route path='member' element = {<div>멤버임</div>}/>
             <Route path='location' element = {<div>위치정보임</div>}/>
          </Route>    

        <Route path='/event' element = {<EventPage/>}>
            <Route path='one' element = {<p>첫 주문시 양배추즙 서비스</p>}/>
            <Route path='two' element = {<p>생일기념 쿠폰받기</p>}/>
          </Route>
      </Routes>


          {
            load == true ? <h4>로딩중입니다.</h4> : null
          }

    </div>
  );
}

function EventPage(){
  return(
    <div>
      <h4>오늘의 이벤트</h4>
      <Outlet></Outlet>
    </div>
  )
}


function About(){
  return (
    <div>
      <h4>회사 정보임</h4>
      <Outlet></Outlet> {/* 위 Nested routes의 element 보여줄 자리*/}
    </div>
  )
}

function Card(props){
      return(
        <div className="col-md-4">
          <img src={'https://codingapple1.github.io/shop/shoes' + (props.i+1) +'.jpg'}  width="80%"/>
          <h4>{props.shoes.title}</h4>
          <p>{props.shoes.price}</p>
        </div>
      )
}



export default App;
