// {PropTypes} = React
// {button, dd, div, dt, dl, i, li, span, ul} = React.DOM
// {CSSTransitionGroup} = React.addons


// # Loosely Definining Types:
// #
// # type alias Volume =
// #   { name : String
// #   , subdirs : Maybe (List String)  // but not actually wrapped in Maybe
// #   }
// #
// # type alias Coord =
// #   { x : Number
// #   , y : Number
// #   }

// # availableVolums : List Volume
// availableVolumes = 
//   [
//     {name: "iPhoto"}
//     {name: "LightRoom"}
//     {name: "Macintosh HD", subdirs: ["Users/lucius"]}
//     {name: "Lucius's Biig Hard Drive Name"}
//     {name: "MOVIES"}
//     {name: "Music"}
//     {name: "OnePlus Two"}
//     {name: "NSFW", subdirs: ["latina", "teen", "twins", "snakes"]}
//     {name: "Lucius Thumb"}
//     {name: "Snakes"}
//     {name: "Animu"}
//   ]
  

// # Button & Title are passed in as a prop, children ar the modal
// #
// # MorphButtonToModal : ReactClass
// MorphButtonToModal = React.createClass {
//   name: "MorphButtonToModal"
  
//   propTypes: {
//     buttonDom: PropTypes.node
//     titleDom: PropTypes.node
//   }
  
//   getInitialState: :getInitialState ->
//     {
//       isOpen: false
//       mainTranslateCoord: {x: 0, y: 0}
//     }
    
//   #componentWillMount: :componentWillMount ->
//   #  return
    
//   componentWillUnmount: :componentWillUnmount ->
//     window.cancelAnimationFrame @mainTranslateAnim
//     window.removeEventListener "resize", @boundResizeHandler, false
//     document.removeEventListener "click", @clickOutClose, false
//     return
  
//   #mainTranslateDuration : Int
//   mainTranslateDuration: 600
  
//   # coordToTranslate : Coord -> String
//   coordToTranslate: :coordToTranslate({x, y}) ->
//     "translate(" + x + "px, " + y + "px)"
  
//   # quadInOut : Number -> Number -> Number -> Number -> Number
//   quadInOut: :quadInOut(time, begin, end, duration) ->
//     if (time = time / (duration / 2)) < 1
//       (end - begin) / 2 * time * time + begin
//     else
//       (end - begin) * -1 / 2 * ((time -= 1) * (time - 2) - 1) + begin
     
//   mainTranslateBack: :mainTranslateBack ->
//     startTime = window.performance.now!
//     startX = @state.mainTranslateCoord.x
//     startY = @state.mainTranslateCoord.y
//     duration = @mainTranslateDuration
//     translate = (t) ~>
//       deltaTime = window.performance.now! - startTime
//       newCoord = {
//         x: @quadInOut deltaTime, startX, 0, duration
//         y: @quadInOut deltaTime, startY, 0, duration
//       }
//       @setState {mainTranslateCoord: newCoord}
//       if deltaTime < duration
//         @mainTranslateAnim = window.requestAnimationFrame translate
//     translate!
//     return
        
//   mainTranslateToCenter: :mainTranslateToCenter ->
//     {morphMain} = @refs
//     startTime = window.performance.now!
//     rect = morphMain.getBoundingClientRect!
//     startX = rect.left
//     startY = rect.top
//     duration = @mainTranslateDuration
//     translate = (t) ~>
//       deltaTime = window.performance.now! - startTime
//       {width, height} = morphMain.getBoundingClientRect!
//       newCoord = {
//         x: @quadInOut deltaTime, 0, ((window.innerWidth - width) * 0.5) - startX, duration
//         y: @quadInOut deltaTime, 0, ((window.innerHeight - height) * 0.5) - startY, duration
//       }
//       @setState {mainTranslateCoord: newCoord}
//       if deltaTime < duration
//          @mainTranslateAnim = window.requestAnimationFrame translate
//     translate!
//     return
    
//   resizeHandler: :resizeHandler(event) ->
//     {top, left} = @refs.morphWrapper.getBoundingClientRect!
//     {width, height} = @refs.morphMain.getBoundingClientRect!
//     newCoord = {
//       x: ((window.innerWidth - width) * 0.5) - left
//       y: ((window.innerHeight - height) * 0.5) - top
//     }
//     @setState {mainTranslateCoord: newCoord}
//     return
    
//   toggleClickOutClose: :toggleClickOutClose ->
//     if @state.isOpen
//       @boundResizeHandler = @resizeHandler.bind @
//       @clickOutClose = (event) ~> 
//         if not event.target.closest ".morph-modal-container"
//           @closeModal!
//       window.addEventListener "resize", @boundResizeHandler, false
//       document.addEventListener "click", @clickOutClose, false
//     else
//       window.removeEventListener "resize", @boundResizeHandler, false
//       document.removeEventListener "click", @clickOutClose, false
//     return
    
//   openModal: :openModal(event) ->
//     @mainTranslateToCenter!
//     @setState {isOpen: true}, @toggleClickOutClose
//     return
    
//   closeModal: :closeModal(event) ->
//     @mainTranslateBack!
//     @setState {isOpen: false}, @toggleClickOutClose
//     return
    
//   # renderButton : () -> React.Element
//   renderButton: :renderButton ->
//     div {ref: "morphButtonContainer", className: "morph-button-container"},
//       button {ref: "morphButton", className: "morph-button", onClick: @openModal}, @props.buttonDom
  
//   # renderModal : () -> React.Element
//   renderModal: :renderModal ->
//     div {ref: "morphModalContainer", className: "morph-modal-container"},
//       div {ref: "morphModalTitle", className: "morph-modal-title"},
//         @props.titleDom
//         button {ref: "morphCloseButton", className: "btn-close", onClick: @closeModal},
//           i {ref: "morphCloseButtonIcon", className: "fa fa-times"}
//           span {ref: "morphCloseButtonLabel", className: "sr-only"}, "Close"
//       div {ref: "morphModalBody", className: "morph-modal-body"},
//         @props.children
  
//   # render : () -> React.Element
//   render: :render ->
//     classNames = ["morph-button-to-modal", (if @state.isOpen then "open" else "closed"), @props.className].join " " .trim!
//     wrapperClassNames = classNames.split " " .map ((s) -> s + "-wrapper") .join " "
//     div {ref: "morphWrapper", className: wrapperClassNames},
//       div {ref: "morphMain", key: "morphButtonToModal", className: classNames, style: {transform: @coordToTranslate @state.mainTranslateCoord}},
//         React.createElement CSSTransitionGroup, 
//           { key                    : "morphButtonTrans"
//           , transitionName         : "morph-button"
//           , transitionEnterTimeout : 700
//           , transitionLeaveTimeout : 200
//           },
//           if @state.isOpen then null else @renderButton!,
//         React.createElement CSSTransitionGroup, 
//           { key                    : "morphModalTrans"
//           , transitionName         : "morph-modal"
//           , transitionEnterTimeout : 1200
//           , transitionLeaveTimeout : 200
//           },
//           if @state.isOpen then @renderModal! else null
// }


// DeviceInfoButtonModal = React.createClass {
//   name: "DeviceInfoButtonModal"
  
//   propTypes: {
//     volumes: PropTypes.arrayOf PropTypes.shape {
//       name: PropTypes.string.isRequired
//       subdirs: PropTypes.arrayOf PropTypes.string
//     }
//   }

//   # renderVolume : Int -> Volume -> Int -> React.Element
//   renderVolume: :renderVolume(colIdx, vol, idx=0) ->
//     div {key: "vol" + colIdx + "." + idx, className: "device-volume"},
//       [ dl {key: colIdx + "." + idx, className: "info-key-value"},
//         dt {key: "key", className: "info-key"}, vol.name
//         dd {key: "value", className: "info-value"}, "Available"
//       ].concat if not vol.subdirs or not vol.subdirs.length then [] else vol.subdirs.map (sub, idx) ~>
//         dl {key: idx, className: "info-key-value"}, [
//           dt {key: "subkey" + idx, className: "sub info-key"}, sub
//           dd {key: "subvalue" + idx, className: "sub info-value"}, "Available"
//         ]

//   # renderVolumes : List Volume -> Int -> React.Element
//   renderVolumes: :renderVolumes(volumes, count) ->
//     count = count or @this.props.volumes.reduce (acc, vol) ->
//       acc + 1 + (if vol.subdirs then vol.subdirs.length else 0)
//     , 0
//     if count < 7
//       div {key: "vol-list-0", className: "device-volume-list", style: {flexBasis: "50%", maxWidth: "50%", paddingLeft: "9rem"}},
//         volumes.map @renderVolume.bind @, 0
//     else
//       splitAt = Math.ceil count * 0.5
//       splitVolumes = ([head, ...tail], count_=0, acc=[[], []]) ->
//         acc[if count_ < splitAt then 0 else 1].push head
//         if tail.length === 0 then acc else splitVolumes tail, count_ + 1 + (if head.subdirs then head.subdirs.length else 0), acc
//       splitVolumes(volumes).map (volColumn, idx) ~>
//         div {key: "vol-list-" + idx, className: "device-volume-list"},
//           volColumn.map @renderVolume.bind @, idx


//   # renderDeviceDetailsInfo : () -> React.Element
//   renderDeviceDetailsInfo: :renderDeviceDetailsInfo ->
//     volCount = @props.volumes.reduce (acc, vol) ->
//       acc + 1 + (if vol.subdirs then vol.subdirs.length else 0)
//     , 0
//     div {className: "device-details-info"}, [
//       div {key: "os-conn-0", className: "device-os-and-connection", style: if volCount < 7 then {flexBasis: "50%", maxWidth: "50%", paddingRight: "9rem"} else {}},
//         dl {className: "info-key-value"},
//           dt {className: "info-key"}, "Operating System"
//           dd {className: "info-value"}, "OS X"
//         dl {className: "info-key-value"},
//           dt {className: "info-key"},
//             i {className: "fa fa-check"}, null
//             span null, " LAN"
//           dd {className: "info-value"}, "192.168.1.1:8111"
//         dl {className: "info-key-value"},
//           dt {className: "info-key"},
//             i {className: "fa fa-times"}, null
//             span null, " P2P"
//           dd {className: "info-value"}, "none"
//         dl {className: "info-key-value"},
//           dt {className: "info-key"},
//             i {className: "fa fa-check"}, null
//             span null, " Relay"
//           dd {className: "info-value"}, "toast.al"
//       ].concat @renderVolumes availableVolumes, volCount
  
//   # renderButtonDom : React.Element
//   renderButtonDom: [
//     i {key: "buttonIcon", className: "info-icon fa fa-info"}, null
//     span {key: "buttonLabel", className: "info-label sr-only"}, "Device Info"
//   ]
    
//   # renderTitleDom : React.Element
//   renderTitleDom: [
//     i {key: "titleIcon", className: "title-icon fa fa-desktop", style: {paddingRight: "0.5em"}}, null
//     span {key: "titleLabel", className: "title-label"}, "Devices Info"
//   ]

//   # deviceInfoButtonModal : () -> React.Element
//   render: :render ->
//     React.createElement MorphButtonToModal, {
//       key: "deviceEntryInfoModal"
//       className: "device-entry-info-modal"
//       buttonDom: @renderButtonDom
//       titleDom: @renderTitleDom
//     }, div {key: "deviceDetailsInfoContainer", className: "device-details-info-container"},
//       div {className: "device-details-info-header"},
//         i {className: "device-image fa fa-desktop"}, null
//         div {className: "device-label"},
//           span {className: "device-name"}, "Lucius Desktop"
//           span {className: "device-online-status"}, "Online"
//       @renderDeviceDetailsInfo!
// }
  
    

// # render the guy
// // ReactDOM.render (React.createElement DeviceInfoButtonModal, {volumes: availableVolumes}), document.getElementById "app"

// export default DeviceInfoButtonModal;