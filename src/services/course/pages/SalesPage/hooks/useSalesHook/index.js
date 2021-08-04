import { 
   useState, 
   useEffect } from 'react';
   
   import { 
   useSelector, 
   useDispatch } from 'react-redux';
   
   import { 
   Redirect,
   navigate } from '@reach/router';
   
   import {
   addToSalesCart,
   buyCourse,
   removeItemFromCart  } from 'services/course/actions/users';
   
   import { 
   Validations } from  'services/course/helpers/Validations';
   
   import BuySessionPackageComponent from 'services/course/pages/SalesPage/components/BuySessionPackageComponent';
   
   function useSalesHook( salesConfig ){
      let  {   
      currentUser, 
      courseId,
      users,
      operatorBusinessName,
      } = salesConfig;
   
      const dispatch = useDispatch();
      const [ totalNumberOfSessions, setTotalNumberOfSessions ] = useState(1);
      const [ sessionType, setSessionType ] = useState(undefined);
      const [ autoRenew, setAutoRenewal ] = useState(false);
      const [ toggleModal, setToggleModal ] = useState( currentUser?.cart?.length > 0 );
      const MyCourses = `/${operatorBusinessName}/mycourses`;
      let course = useSelector(state => Object.values(state.courses.courses))?.find(course => course?._id === courseId );
   
      useEffect(() => {
         if ( ! userOwnsCourse(currentUser, courseId) && ( ! sessionType ) ) {       
               BuySessionPackageComponent(setSessionType);              
         } 
      }, [ currentUser, courseId, sessionType ]);
   
      if ( currentUser?.paymentStatus === "approved" ) {
         navigate(MyCourses);
      }
    
   const userOwnsCourse = (user, courseId) => {
      if ( ! user ) {
         return false;
      }
   
      if ( user.userRole === 'admin' ) {
         return true;
      }
      return user?.courses?.includes(courseId);
   };
    
      if ( userOwnsCourse(currentUser, courseId) ) { 
         return <Redirect to={`/${operatorBusinessName}/courses/${courseId}`} noThrow/>;
      } 
    
      let tutor = users?.find(user => user._id === course?.createdBy), numberOfSessions = 0;
   
      let cartConfig = {
         course, 
         sessionType: sessionType, 
         numberOfSessions: numberOfSessions, 
         totalNumberOfSessions: totalNumberOfSessions, 
         userId: currentUser?._id, 
         tutor: tutor,
         startDate: Date.now(),
         endDate: Date.now(),
         status: true, 
         autoRenew: autoRenew,
         autoRenewDates: Date.now()
      };
   
   const addToCartAndReturnToCourses = () => {
      addCourseToCart( cartConfig );
   };
    
   const addCourseToCart = ( salesCartConfig ) => {
      let duplicateItemsExist = ( (currentUser?.cart?.filter(item => item?.course?._id === courseId ))?.length > 0 );
   
      if ( duplicateItemsExist ) {  
         Validations.warn(`Duplicate. ${salesCartConfig.course?.name} is already in your cart.`);
         navigate(MyCourses);
         return;
      }
      else {
         dispatch(addToSalesCart( salesCartConfig )); 
         navigate(MyCourses);
      };
   };
   
   const closeNewCourseModal = () => {
      setToggleModal( false );
    };
    
    const buyOrLogin = () => {
      if ( currentUser ) {
          setToggleModal( false );
          dispatch(buyCourse(currentUser));
          return;
      } else {
          navigate('/login');
      }
    };
   
   const removeFromCart = () => {
      removeItemFromCart( course );
      navigate('/mycourses');
   };
   
   const returnToCourseListPage = () => { 
      navigate('/mycourses');
   };
   
   return{
      tutor,
      sessionType,
      toggleModal,
      returnToCourseListPage:() => returnToCourseListPage(),
      removeFromCart:() => removeFromCart(),
      closeNewCourseModal:() => closeNewCourseModal(),
      buyOrLogin:() => buyOrLogin(),
      addToCartAndReturnToCourses:() => addToCartAndReturnToCourses(),
      setTotalNumberOfSessions:(val) => setTotalNumberOfSessions(val),
      setAutoRenewal:(val) => setAutoRenewal(val)
   }; };
   
   export default useSalesHook;