import imageCookie from './assets/cookie.png'

const styles = `
  #cc_div, #cc_div button, #cc_div .cc_text {
    font-family: inherit;
    font-size: 14px;
  }
  #cc_div {
    left: 0;
    right: 0;
    margin: auto;
    padding: 8px;
    z-index: 10000;
    min-height: 48px;
    background: #EBF7FF;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    flex-wrap: wrap;
    position: fixed;
    bottom: 48px;
    -webkit-animation-name: slideIn;
    -webkit-animation-duration: 150ms;
    animation-name: slideIn;
    animation-duration: 150ms;
    box-shadow: 0px 5px 30px -2px rgba(0,0,0,0.25);
    transition: opacity 0.3s ease;
  }
  #cc_div .cc_text {
    color: #333333;
    margin-right: 15px;
  }
  #cc_div .cc_img {
    margin-right: 8px;
    width: 32px;
    height: 32px;
    background-position: center center;
    background-size: contain;
    background-image: url('${imageCookie}');
  }
  #cc_div .cc_text > a, #cc_div  .cc_text > a:visited {
    color: #48A1E6;
  }
  #cc_div button {
    width: 220px;
    height: 32px;
    background: #48A1E6;
    border-radius: 5px;
    color: #FFFFFF;
    border: 0;
    font-weight: 0;
    -webkit-transition: background-color .33s ease-out;
    -moz-transition: background-color .33s ease-out;
    -o-transition: background-color .33s ease-out;
    transition: background-color .33s ease-out;
  }

  #cc_div button:hover {
    background-color: #258CDC;
    cursor: pointer;
  }


  #cc_div .cc_right_content {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: space-between;

  }
  @-webkit-keyframes slideIn {
    0% {opacity: 0; bottom: 0;}
    100% {opacity: 1; bottom: 48px;}
  }
  @keyframes slideIn {
    0% {opacity: 0; bottom: 0;}
    100% {opacity: 1; bottom: 48px;}
  }
  @media screen and (max-width: 374px) {
    #cc_div {
      width: 280px;
      min-height: 142px;
      align-items: flex-start;
      bottom: 48px;
    }
    #cc_div .cc_right_content {
      flex-direction: column;
      align-items: flex-start;
    }
    #cc_div .cc_text {
      margin-bottom: 16px;
      max-width: 260px;
    }
    #cc_div button {
      width: 200px;
    }
  }
  @media screen and (min-width: 375px) and (max-width: 767px) {
    #cc_div {
      width: 338px;
      min-height: 142px;
      align-items: flex-start;
      bottom: 48px;
    }
    #cc_div .cc_right_content {
      flex-direction: column;
      align-items: flex-start;
    }
    #cc_div .cc_text {
      margin-bottom: 16px;
      max-width: 260px;
    }
    #cc_div button {
      width: 200px;
    }
  }
  @media screen and (min-width:768px) and (max-width: 1023px)  {
    #cc_div {
       width: 700px;
       min-height: 64px;
       bottom: 48px;
    }
  }
  @media screen and (min-width:1024px) and (max-width: 1279px) {
    #cc_div {
       width: 940px;
       bottom: 68px;
    }
    #cc_div .cc_text {
      line-height: 18px;
    }
    @-webkit-keyframes slideIn {
      from {bottom: -142px; opacity: 0}
      to {bottom: 64px; opacity: 1}
    }
    @keyframes slideIn {
      from {bottom: -142px; opacity: 0}
      to {bottom: 64px; opacity: 1}
    }
    #cc_div .cc_img {
      width: 28px;
      height: 28px;
      background-image: url('${imageCookie}');

    }
  }
  @media screen and (min-width:1280px) {
    #cc_div , #cc_div button, #cc_div .cc_text {
      font-size:16px;
    }
    #cc_div {
       width: 1180px;
       bottom: 84px;
    }
    @-webkit-keyframes slideIn {
      from {bottom: -142px; opacity: 0}
      to {bottom: 84px; opacity: 1}
    }
    @keyframes slideIn {
      from {bottom: -142px; opacity: 0}
      to {bottom: 84px; opacity: 1}
    }
    #cc_div .cc_img {
      width: 28px;
      height: 28px;
      background-image: url('${imageCookie}');
    }
  }
 `

export default styles
