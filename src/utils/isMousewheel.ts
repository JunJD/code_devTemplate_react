type isMw = "allow" | 'ban'
export default (type:isMw)=>{
    window.addEventListener(
        "mousewheel",
        function (event:any) {
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault();
          } else {
            console.log(12313);
          }
        },
        { passive: type === 'allow' },
      );
}