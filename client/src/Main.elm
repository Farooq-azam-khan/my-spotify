module Main exposing (main)

import Browser
import Browser.Navigation as Nav
import Html exposing (..)
import Html.Attributes exposing (..)
import RemoteData exposing (RemoteData(..), WebData)
import Html.Events exposing (onClick)
import Http
import Url exposing (Url)
import Json.Decode as D exposing (Decoder)

type alias Song = { id: String, name: String }

type alias Model =
    { songs : WebData (List Song), key : Nav.Key }



type Msg
    = GotAllSongs (RemoteData.WebData (List Song)) 
    | ChangedUrl Url
    | ClickedLink Browser.UrlRequest


view : Model -> Browser.Document Msg
view model =
    { title = "counter"
    , body =
        [ div
            [ class "mx-5 sm:mx-0 sm:mx-auto lg sm:max-w-xl lg:max-w-3xl mt-10 space-x-10" ]
            [ case model.songs of 
                Success songs -> 
                    ul [] (List.map (\song -> li [] [text song.name]) songs)
                _ -> 
                    div [] [text "error, loading, or not asked"]
            ]
        ]
    }


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        GotAllSongs web_data_song -> 
            ({model | songs = web_data_song}, Cmd.none)

        ChangedUrl _ ->
            ( model, Cmd.none )

        ClickedLink urlRequest ->
            case urlRequest of
                Browser.External href ->
                    ( model, Nav.load href )

                Browser.Internal url ->
                    ( model, Nav.pushUrl model.key (Url.toString url) )


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.none


init : flags -> Url -> Nav.Key -> ( Model, Cmd Msg )
init _ _ key =
    ( { songs = Loading, key = key }, get_all_songs )

get_all_songs : Cmd Msg 
get_all_songs = Http.get {url = "/api/v1/songs", expect = Http.expectJson (RemoteData.fromResult >> GotAllSongs) (D.list song_decoder)}

song_decoder : Decoder Song 
song_decoder = D.map2 Song (D.field "id" D.string) (D.field "name" D.string)

main : Program () Model Msg
main =
    Browser.application
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        , onUrlChange = ChangedUrl
        , onUrlRequest = ClickedLink
        }
