<script setup>
import TheFooter from '../components/TheFooter.vue'
</script>

<template>
    <div class="main-container">
        <div class="header-container">
            <img class="logo-picture" src="../assets/TheNotesLogo.png" />
        </div>
        <div class="content-container">
            <div class="bla">
                <div class="landing-slogan-container">
                    <div class="slogan">
                        <div>
                            <h4 class="slogan-h2">
                                <p>
                                    Hey there! My name is Taya and
                                    <span class="welcome-the-notes"
                                        >Welcome to TheNotes</span
                                    >.
                                </p>
                                <p>
                                    "TheNotes" is my self-education web
                                    application. The aim of this project was to
                                    create user-friendly software for making,
                                    editing, searching, and deleting notes under
                                    your account.
                                </p>
                                <p>
                                    "TheNotes" application has features such as
                                    authentication tokens and securely storing
                                    users' credentials and notes in MongoDB. For
                                    the backend, I utilized Node.js and Express
                                    for the HTTP API, and for the frontend, I
                                    used Vue.js and Vite.
                                </p>
                                <p>
                                    I'm pleased with how the application turned
                                    out and proud of my work.
                                </p>
                                <p>
                                    Making people's lives easier and helping
                                    them understand IT better is my valuable
                                    contribution. My experience in IT support
                                    provides me a great opportunity to do that.
                                    Currently, I'm dedicated to expanding my
                                    expertise in web software development and
                                    cloud computing.
                                </p>
                                <p>
                                    Outside of work and learning, I find joy in
                                    tending to my garden and adding personal
                                    touches to my home, whether it's painting
                                    walls or building shed for my growing
                                    collection of "handywoman" tools.
                                </p>
                                <p>
                                    I also treasure moments spent with friends
                                    and love cozy evenings watching TV series
                                    with my family.
                                </p>
                                <p>It's wonderful to meet you!</p>
                            </h4>
                        </div>
                    </div>
                </div>
                <div class="landing-girl-with-ideas">
                    <img src="../assets/girl with ideas.png" />
                </div>
            </div>
        </div>
        <TheFooter />
    </div>
</template>

<style scoped>
p {
    text-align: justify;
    text-justify: inter-word;
}

.welcome-the-notes {
    font-weight: bold;
    font-style: italic;
}

.get-started {
    padding-left: 5rem;
}
.get-started-button {
    border: 2px solid rgba(51, 51, 52, 0.601);
    background-color: rgb(51, 51, 51);
    color: rgb(231, 231, 231);
    border: 2px solid rgba(231, 231, 231, 0.601);
    padding: 0.8rem 1.6rem;
    font-size: 1.5rem;
    border-radius: 5px;
    cursor: pointer;
}

.slogan-h1,
.slogan-h2 {
    margin-bottom: 0;
    margin-top: 0.5rem;
    padding-right: 1.5em;
}

.slogan-h1 {
    font-weight: 700;
    font-style: italic;
}

.slogan {
    width: 100%;
    display: flex;
    align-items: end;
    flex-direction: column;
}

.bla {
    border: 2px solid yellow;
    display: flex;
    justify-content: space-around;
    width: 100%;
    padding-left: 1.5rem;
}

.landing-slogan-container {
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-grow: 1;
}

.landing-girl-with-ideas {
    border: 1px solid red;
    height: 20rem;
    padding-right: 4rem;
}

.landing-girl-with-ideas img {
    height: 100%;
}

.header-container {
    width: 100%;
    z-index: 10;
    align-items: left;
    display: flex;
    overflow: hidden;
}

.logo-picture {
    height: 6rem;
    margin-left: 0.5rem;
}

.content-container {
    flex: 1;
    overflow: auto;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding-left: 3rem;
    padding-right: 3rem;
}

.main-container {
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

/* .content-container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    position: absolute;
    top: 0;
    left: 0;
}

.main-container {
    height: 100vh;
} */
</style>
