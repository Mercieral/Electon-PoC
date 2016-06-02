
export function modelTransition(modelFunc){
    return new Promise(function(resolve, reject){
        setTimeout(function(){
            return modelFunc().then(resolve, reject);
        },0);
    });
}


export function transitionModel(modelFunc){
    return function(params) {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                const model = modelFunc(params);
                if(model.then){
                    model.then(resolve, reject);
                }else{
                    resolve(model);
                }
            }, 0);
        });
    };
}

export const getParentRoute = (routeName) => routeName.split('.').slice(0, -1).join('.');
