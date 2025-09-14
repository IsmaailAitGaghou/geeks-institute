class Video{
    constructor(title, uploader, time){
        this.title = title;
        this.uploader = uploader;
        this.time = time; //time in seconds
    }

    watch(){
        console.log(`${this.uploader} watched all ${this.time} of ${this.title}`);
    }
}

const video1 = new Video("Learn JavaScript", "programmer", 120);
video1.watch();

const video2 = new Video("Learn Python", "YouTuber", 180);
video2.watch();

const videoData = [
    { title: "JavaScript Basics", uploader: "Alice", time: 300 },
    { title: "Advanced Python", uploader: "Bob", time: 450 },
    { title: "Web Development", uploader: "Charlie", time: 600 },
];

videoData.forEach(video => {
    const videoInstance = new Video(video.title, video.uploader, video.time);
    videoInstance.watch();
});