let descriptions = [
    'Some two-line description of the channel',
    'Some short description',
    'Some very very long description that takes a lot of lines to make sure that it turns to ellipsis not to overflow the text below'
];

export class ChannelDynamicMock {

    'id' = 456;
    'name' = 'amazon';
    'isConfigured' = false;
    'description' = 'Some two-line description of the channel';
    'type' = 'marketplace';
    'segment' = 'everything';
    'offer' = 'http://example.fr';
    'countries' = [];
    '_links' = {
        'self': {
            'href': '/v1/channel/456'
        },
        'image': {
            'href': '/amazon.jpg'
        }
    };

    static generate(amount) {
        let array = [];
        for (let i = 0; i < amount; i++) {
            array.push(i);
        }

        return array.map(() => {
            let channel = new ChannelDynamicMock();
            let random = Math.round(Math.random() * 300);
            channel.name = 'amazon' + random;
            channel.description = descriptions[random % 3];
            return channel;
        });
    }

}