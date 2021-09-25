import React, {useState, useEffect} from 'react';
import {StyleSheet, FlatList, SafeAreaView} from 'react-native';
import ListItem from '../components/ListItem';
import Loading from '../components/Loading';
import Constants from 'expo-constants';
import axios from 'axios';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

const URL = `https://news.google.com/rss/search?q=青森&hl=ja&gl=JP&ceid=JP:ja`;

export default HomeScreen = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const response = await axios.get(URL);
      //タイトル文字列処理
      var result = response.data.match(/<title(?: .+?)?>.*?<\/title>/g);
      var retArray = [];
      var pattern2 = new RegExp("<(\"[^\"]*\"|'[^']*'|[^'\">])*>", "g");
      result.forEach(function (value) {
          // HTMLタグのみを削除して戻り値配列に格納
          retArray.push(value.replace(pattern2, ""));
      });
      //'-　新聞社'の'-'のインデックスリスト
      var titleIndexArray = [];
      retArray.forEach(function (value) {
          // HTMLタグのみを削除して戻り値配列に格納
          titleIndexArray.push(value.indexOf("-"));
      });
      //タイトルリスト
      var titleArray = [];
      var i = 0;
      retArray.forEach(function (value) {
          // HTMLタグのみを削除して戻り値配列に格納
          titleArray.push(value.slice(0, titleIndexArray[i]));
          i++;
      });
      //出版社リスト
      var editorArray = [];
      var i = 0;
      retArray.forEach(function (value) {
          editorArray.push(value.slice(titleIndexArray[i] + 2));
          i++;
      });
      //URLリスト
      var r = response.data.match(/<link(?: .+?)?>.*?<\/link>/g);
      var urlArray = [];
      var pattern2 = new RegExp("<(\"[^\"]*\"|'[^']*'|[^'\">])*>", "g");
      r.forEach(function (value) {
          // HTMLタグのみを削除して戻り値配列に格納
          urlArray.push(value.replace(pattern2, ""));
      });
      //json化
      let dataS = [];
      var i = 0;
      titleArray.forEach(function (value) {
          var dodo = { title: `${value}`, author: `${editorArray[i]}`, url: `${urlArray[i]}` };
          dataS.push(dodo);
          i++;
      });
      let dataSet = dataS.splice(1);
      console.log(dataSet);
      //setArticlesにAPIから取得したデータ格納
      setArticles(dataSet);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };


  return (
    <SafeAreaView style={styles.container}>
      
      <FlatList
        data={articles}
        renderItem={({item}) => (
          <ListItem
            //imageUrl={item.urlToImage}
            title={item.title}
            author={item.author}
            onPress={() =>
              props.navigation.navigate('詳細', {article: item})
            }
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      { loading && <Loading /> }
    </SafeAreaView>
  );
};



