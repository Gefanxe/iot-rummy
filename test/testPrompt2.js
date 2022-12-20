import prompts from 'prompts';

async function startPrompt(callback) {
    const response = await prompts([
        {
            type: 'number',
            name: 'number',
            message: '要顯示的數字?',
            onState: (state) => {
                onPromptState(state);
            }
        }
    ], { onSubmit: callback });
}

startPrompt((prompt, answer) => {
    console.log('你的答案:', answer);
});

function onPromptState(state) {

}